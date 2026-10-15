from django.shortcuts import render, redirect,get_object_or_404
from django.http import HttpResponse
from .models import Category, Task
from django.contrib.auth import authenticate, login, logout 
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from .forms import TaskForm, TaskEditForm, CategoryForm
from django.contrib import messages
from django.http import JsonResponse

def index(request):
    return HttpResponse("Hello World")

@login_required
def task_list(request):
    tasks = Task.objects.filter(user=request.user)
    response = request.get_preferred_type(["text/html", "application/json"])
    if response == "application/json":
        tasks_list = []
        for task in tasks:
            tasks_dict = {"category":task.category.title,
                            "id":task.id,
                            "title":task.title, 
                            "description":task.description ,
                            "completed":task.completed,
                            "success":True}
            tasks_list.append(tasks_dict)
        return JsonResponse(data={"tasks":tasks_list},status=200)
            
    context = {
        'tasks':tasks
    }
    return render(request,'task_list.html',context)

@login_required
def task_detail(request,pk):
    task = get_object_or_404(Task,pk=pk,user=request.user)
    context = {
        'task':task,
    }
    return render(request,'task_detail.html',context)

@login_required
def add_task(request):
    if request.method == 'POST':
        form = TaskForm(request.POST,user=request.user)
        response = request.get_preferred_type(["text/html", "application/json"])
        if form.is_valid():
            task = form.save(commit=False)
            task.user = request.user
            task.save()
            if response == "application/json":
                return JsonResponse({"category":task.category_id,
                                     "id":task.id,
                                     "title":task.title, "description":task.description ,"completed":task.completed,"success":True},status=201)
            messages.success(request, "Task added successfully")
            return redirect('task_list')
        else:
            if response == "application/json":
                return JsonResponse(data=form.errors.get_json_data(),status=400)  
    else:
        form = TaskForm(user=request.user)
    context = {
        'form':form
    }
    return render(request,'add_task.html',context)

@login_required
def add_category(request):
    if request.method == 'POST':
        form = CategoryForm(request.POST)
        if form.is_valid():
            category = form.save(commit=False)
            category.user = request.user
            category.save()
            return redirect('add_task')
    else:
        form = CategoryForm()
    context = {
        'form':form
    }
    return render(request, 'add_category.html', context)

@login_required
def edit_task(request,pk):
    task = get_object_or_404(Task,pk=pk,user=request.user)
    if request.method == 'POST':
        form = TaskEditForm(request.POST, instance=task)
        if form.is_valid():
            form.save()
            messages.success(request, "Task Updated")
            return redirect('task_detail',pk=task.pk)
    else:
        form = TaskEditForm(instance=task,user=request.user)
    context = {
        'form':form
    }
    return render(request, 'edit_task.html', context)

@login_required
def toggle_completion(request,pk):
    task = get_object_or_404(Task,pk=pk,user=request.user)
    if request.method == 'POST':
        completed_value = request.POST.get("completed")
        if completed_value == "true":
            task.completed = True
            task.save()
            return JsonResponse({"id":task.id,"completed":task.completed},status=200)
        elif completed_value == "false":
            task.completed = False
            task.save()
            return JsonResponse({"id":task.id,"completed":task.completed},status=200)
        else:
            return JsonResponse(data={"error":"Invalid"},status=400)
    else:
        return JsonResponse(data={"error":"Invalid"},status=405)
    
@login_required
def delete_task(request,pk):
    task = get_object_or_404(Task,pk=pk,user=request.user)
    if request.method == 'POST':
        task.delete()
        messages.info(request, "Task Deleted")
        return redirect('task_list')
    context = {
        'task':task
    }
    return render(request,'delete_task.html',context)

def login_page(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)

        if user is None:
            messages.error(request, "Invalid username or Password")
            return redirect('login_page')
        else:
            login(request, user)
            return redirect('task_list')
    return render(request, 'login.html')

def logout_page(request):
    logout(request)
    messages.info(request, "You are logged out")
    return redirect('login_page')

def register_page(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = User.objects.filter(username=username)

        if user.exists():
            messages.info(request, "Username already taken")
            return redirect('register_page')

        user = User.objects.create_user(
            email=email,
            username=username,
            password=password
        )

        login(request, user)
        messages.info(request, "Account created successfully")
        return redirect('task_list')
    return render(request,'register.html')