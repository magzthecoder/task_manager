from django.urls import path
from . import views

urlpatterns = [
    path('',views.index,name='index'),
    path('login/',views.login_page,name='login_page'),
    path('logout/',views.logout_page,name='logout_page'),
    path('register/',views.register_page,name='register_page'),

    path('task/',views.task_list,name='task_list'),

    path('task/add/',views.add_task,name='add_task'),
    path('task/category/add/',views.add_category,name='add_category'),
    path('task/<int:pk>/detail/',views.task_detail,name='task_detail'),
    # path('task/<int:pk>/detail/',views.toggle_task,name='toggle_task'),
    path('task/<int:pk>/edit/',views.edit_task,name='edit_task'),
    path('task/<int:pk>/delete/',views.delete_task,name='delete_task'),
    path('task/<int:pk>/toggle/',views.toggle_completion,name='toggle_completion'),
    #url calls look like task/edit/7 the same for detail and delete 
]