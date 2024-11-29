<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Proyecto</th>
          <th>Tareas</th>
          <th>Avance</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(project, index) in projects" :key="project.id" class="hover">
          <th>{{ index + 1 }}</th>
          <td>{{ project.name }}</td>
          <td>{{ project.progress >= 100 ? 'Finalizado' : 'En progreso' }}</td>
          <td class="relative">
            <div class="w-full bg-gray-200 h-2 rounded">
              <div 
                class="h-full transition-all duration-300 ease-in-out rounded" 
                :class="project.progress >= 100 ? 'bg-success' : 'bg-secondary'"
                :style="{ width: `${project.progress}%` }"
              ></div>
            </div>
          </td>
          <td>
            <button 
              @click="completeTask(project)"
              class="btn btn-sm"
              :class="project.progress >= 100 ? 'btn-success' : 'btn-secondary'"
              :disabled="project.progress >= 100"
            >
              {{ project.progress >= 100 ? 'Completado' : 'Completar tarea' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <input-modal
    :open="modalOpen"
    @close="modalOpen = false"
    @value="onNewValue"
    placeholder="Ingrese el nombre del proyecto"
    title="Nuevo proyecto"
    sub-title="Dale un nombre único a tu proyecto"
  />

  <custom-modal :open="customModalOpen">
    <template #header>
      <h1 class="text-3xl">Titulo del modal</h1>
    </template>

    <template #body>
      <p>
        Nulla consequat non ullamco mollit est quis duis pariatur cupidatat consequat Lorem cillum.
      </p>
    </template>

    <template #footer>
      <div class="flex justify-end">
        <button @click="customModalOpen = false" class="btn mr-4">Close</button>
        <button @click="customModalOpen = false" class="btn btn-primary">Aceptar</button>
      </div>
    </template>
  </custom-modal>

  <fab-button @click="modalOpen = true">
    <AddCircle />
  </fab-button>

  <fab-button @click="customModalOpen = true" position="bottom-left">
    <ModalIcon />
  </fab-button>
</template>

<script lang="ts" setup>
import CustomModal from '@/modules/common/components/CustomModal.vue';
import FabButton from '@/modules/common/components/FabButton.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import AddCircle from '@/modules/common/icons/AddCircle.vue';
import ModalIcon from '@/modules/common/icons/ModalIcon.vue';
import { ref } from 'vue';
import { useProgressStore } from '@/stores/progressStore';

interface Project {
  id: number;
  name: string;
  tasks: string;
  progress: number;
}

const projects = ref<Project[]>([]);
const modalOpen = ref(false);
const customModalOpen = ref(false);
const progressStore = useProgressStore();

const onNewValue = (projectName: string) => {
  progressStore.startLoading();
  
  setTimeout(() => {
    progressStore.updateProgress(30);
    setTimeout(() => {
      progressStore.updateProgress(60);
      
      const newProject: Project = {
        id: projects.value.length + 1,
        name: projectName,
        tasks: 'Pendiente',
        progress: 0
      };
      
      projects.value.push(newProject);
      
      const incrementProgress = setInterval(() => {
        if (newProject.progress < 30) {
          newProject.progress += 5;
        } else {
          clearInterval(incrementProgress);
        }
      }, 200);
      
      setTimeout(() => {
        progressStore.stopLoading();
        modalOpen.value = false;
      }, 500);
    }, 300);
  }, 300);
};

const completeTask = (project: Project) => {
  progressStore.startLoading();
  
  setTimeout(() => {
    progressStore.updateProgress(50);
    
    if (project.progress < 100) {
      project.progress += 10;
    }
    
    setTimeout(() => {
      progressStore.stopLoading();
    }, 500);
  }, 300);
};
</script>
