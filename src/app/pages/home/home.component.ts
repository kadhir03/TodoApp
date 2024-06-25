import { Component, OnInit, HostListener } from '@angular/core';

interface Task {
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newTask: string = '';
  tasks: Task[] = [];
  filter: 'all' | 'pending' | 'completed' = 'all';
  lastScrollTop: number = 0;

  ngOnInit(): void {
    this.loadTasksFromLocalStorage();
  }

  addTask(): void {
    if (this.newTask.trim()) {
      this.tasks.push({ description: this.newTask.trim(), completed: false });
      this.newTask = '';
      this.saveTasksToLocalStorage();
    }
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
    this.saveTasksToLocalStorage();
  }

  updateTask(index: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.tasks[index].description = inputElement.value;
      this.saveTasksToLocalStorage();
    }
  }

  toggleTaskCompletion(index: number): void {
    this.tasks[index].completed = true;
    this.saveTasksToLocalStorage();
  }

  setFilter(filter: 'all' | 'pending' | 'completed'): void {
    this.filter = filter;
  }

  get filteredTasks(): Task[] {
    let filtered: Task[] = [];
    switch (this.filter) {
      case 'pending':
        filtered = this.tasks.filter(task => !task.completed);
        break;
      case 'completed':
        filtered = this.tasks.filter(task => task.completed);
        break;
      default:
        filtered = this.tasks;
    }
    return filtered;
  }

  private saveTasksToLocalStorage(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  private loadTasksFromLocalStorage(): void {
    if (this.isLocalStorageAvailable()) {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
      }
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > this.lastScrollTop) {
      navbar.classList.remove('fixed-top');
    } else {
      navbar.classList.add('fixed-top');
    }
    this.lastScrollTop = scrollTop;
  }
}
