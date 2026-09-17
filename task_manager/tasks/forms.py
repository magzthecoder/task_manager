from django import forms
from .models import Task,Category

class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ['category','title','description']
        widgets ={
            'category':forms.Select(attrs={
                    'class':'category-select',
            }),
            'title':forms.TextInput(attrs={
                'class':'form-input',
                'placeholder':'Enter task name....'
            }),
            'description':forms.Textarea(attrs={
                'class':'form-input',
                'placeholder':'Description....'
            })
        }

    def __init__(self,*args,user=None, **kwargs):
        super().__init__(*args, **kwargs)
         # Only show categories owned by the currently logged-in user in the task form dropdown
        self.fields['category'].queryset = Category.objects.filter(user=user)

class TaskEditForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ['category','title','description','completed']
        widgets ={
            'category':forms.Select(attrs={
                    'class':'category-select',
            }),
            'title':forms.TextInput(attrs={
                'class':'form-input',
                'placeholder':'Enter task name....'
            }),
            'description':forms.Textarea(attrs={
                'class':'form-input',
                'placeholder':'Description....'
            }),
            'completed':forms.CheckboxInput(attrs={
                 'class':'checkbox',
            })
        }
        
    def __init__(self,*args,user=None, **kwargs):
            super().__init__(*args, **kwargs)
             # Only show categories owned by the currently logged-in user in the task form dropdown
            self.fields['category'].queryset = Category.objects.filter(user=user)

class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['title' ]