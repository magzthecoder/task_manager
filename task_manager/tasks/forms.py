from django import forms
from .models import Task,Category

class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ['category','title','description']

class TaskEditForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ['category','title','description','completed']

class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['title' ]