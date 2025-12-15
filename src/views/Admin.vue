<!--<script setup lang="ts">-->
<!--import { ref, onMounted, onUnmounted } from 'vue'-->
<!--import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy, updateDoc } from 'firebase/firestore'-->
<!--import { db } from '../firebase'-->

<!--interface User {-->
<!--  id: string-->
<!--  name: string-->
<!--  taken: boolean-->
<!--}-->

<!--const name = ref('')-->
<!--const users = ref<User[]>([])-->
<!--const loading = ref(false)-->

<!--const usersRef = collection(db, 'users')-->
<!--const q = query(usersRef, orderBy('name'))-->

<!--let unsubscribe: () => void-->

<!--onMounted(() => {-->
<!--  unsubscribe = onSnapshot(q, (snapshot) => {-->
<!--    users.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as User))-->
<!--  })-->
<!--})-->

<!--onUnmounted(() => unsubscribe?.())-->

<!--const addUser = async () => {-->
<!--  if (!name.value.trim()) return-->
<!--  loading.value = true-->
<!--  try {-->
<!--    await addDoc(usersRef, { name: name.value.trim(), taken: false })-->
<!--    name.value = ''-->
<!--  } finally {-->
<!--    loading.value = false-->
<!--  }-->
<!--}-->

<!--const removeUser = async (id: string) => {-->
<!--  if (confirm('Удалить участника?')) {-->
<!--    await deleteDoc(doc(db, 'users', id))-->
<!--  }-->
<!--}-->

<!--const resetStatus = async (id: string) => {-->
<!--  await updateDoc(doc(db, 'users', id), { taken: false })-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <div class="card">-->
<!--    <h1>🎅 Админка</h1>-->

<!--    <div class="form-row">-->
<!--      <input-->
<!--          v-model="name"-->
<!--          @keydown.enter="addUser"-->
<!--          placeholder="Имя участника"-->
<!--          :disabled="loading"-->
<!--      />-->
<!--      <button class="add-btn" @click="addUser" :disabled="!name || loading">+</button>-->
<!--    </div>-->

<!--    <div class="list-container">-->
<!--      <ul class="list">-->
<!--        <li v-for="user in users" :key="user.id" :class="{ taken: user.taken }">-->
<!--          <span class="user-name" @click="resetStatus(user.id)" title="Нажми чтобы сбросить статус">-->
<!--            {{ user.name }}-->
<!--            <small v-if="user.taken">🎁 (занят)</small>-->
<!--          </span>-->
<!--          <button class="del-btn" @click="removeUser(user.id)">×</button>-->
<!--        </li>-->
<!--      </ul>-->
<!--      <div v-if="users.length === 0" class="empty">Список пуст</div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped>-->
<!--.card {-->
<!--  background: rgba(255, 255, 255, 0.35);-->
<!--  backdrop-filter: blur(12px);-->
<!--  -webkit-backdrop-filter: blur(12px);-->
<!--  padding: 2rem;-->
<!--  border-radius: 20px;-->
<!--  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);-->
<!--  border: 1px solid rgba(255, 255, 255, 0.3);-->
<!--  max-width: 90%;-->
<!--  width: 400px;-->
<!--  margin: 0 auto;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  max-height: 80vh; /* Ограничим высоту, чтобы скроллился список */-->
<!--}-->

<!--h1 {-->
<!--  color: var(&#45;&#45;green);-->
<!--  margin-top: 0;-->
<!--  margin-bottom: 1.5rem;-->
<!--  text-shadow: 1px 1px 0 rgba(255,255,255,0.5);-->
<!--  font-weight: 700;-->
<!--  text-align: center;-->
<!--}-->

<!--.form-row {-->
<!--  display: flex;-->
<!--  gap: 10px;-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--input {-->
<!--  flex: 1;-->
<!--  padding: 12px;-->
<!--  font-size: 1rem;-->
<!--  background: rgba(255, 255, 255, 0.5);-->
<!--  border: 2px solid rgba(255, 255, 255, 0.3);-->
<!--  border-radius: 12px;-->
<!--  outline: none;-->
<!--  transition: background 0.3s;-->
<!--  font-family: sans-serif;-->
<!--}-->

<!--input:focus {-->
<!--  border-color: var(&#45;&#45;green);-->
<!--  background: rgba(255, 255, 255, 0.85);-->
<!--}-->

<!--.add-btn {-->
<!--  padding: 0 20px;-->
<!--  font-size: 1.5rem;-->
<!--  background: var(&#45;&#45;green);-->
<!--  color: white;-->
<!--  border: none;-->
<!--  border-radius: 12px;-->
<!--  cursor: pointer;-->
<!--  box-shadow: 0 4px 0 #0f4224;-->
<!--  transition: transform 0.1s;-->
<!--}-->

<!--.add-btn:active { transform: translateY(4px); box-shadow: none; }-->
<!--.add-btn:disabled { opacity: 0.5; cursor: not-allowed; }-->

<!--.list-container {-->
<!--  overflow-y: auto; /* Скролл для списка */-->
<!--  padding-right: 5px;-->
<!--}-->

<!--/* Стилизация скроллбара */-->
<!--.list-container::-webkit-scrollbar { width: 6px; }-->
<!--.list-container::-webkit-scrollbar-thumb { background: var(&#45;&#45;green); border-radius: 3px; }-->
<!--.list-container::-webkit-scrollbar-track { background: rgba(255,255,255,0.3); }-->

<!--.list {-->
<!--  list-style: none;-->
<!--  padding: 0;-->
<!--  margin: 0;-->
<!--}-->

<!--li {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--  padding: 10px 15px;-->
<!--  background: rgba(255, 255, 255, 0.6);-->
<!--  margin-bottom: 8px;-->
<!--  border-radius: 10px;-->
<!--  transition: all 0.2s;-->
<!--}-->

<!--li:hover {-->
<!--  background: rgba(255, 255, 255, 0.9);-->
<!--}-->

<!--.user-name {-->
<!--  font-weight: bold;-->
<!--  color: #333;-->
<!--  cursor: pointer;-->
<!--  flex: 1;-->
<!--  font-family: sans-serif;-->
<!--}-->

<!--li.taken .user-name {-->
<!--  color: #888;-->
<!--  text-decoration: line-through;-->
<!--}-->

<!--small {-->
<!--  font-weight: normal;-->
<!--  font-size: 0.8em;-->
<!--  color: var(&#45;&#45;red);-->
<!--  text-decoration: none;-->
<!--  display: inline-block;-->
<!--  margin-left: 5px;-->
<!--}-->

<!--.del-btn {-->
<!--  background: var(&#45;&#45;red);-->
<!--  color: white;-->
<!--  border: none;-->
<!--  border-radius: 50%;-->
<!--  width: 24px;-->
<!--  height: 24px;-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  cursor: pointer;-->
<!--  margin-left: 10px;-->
<!--  font-size: 1.2rem;-->
<!--  line-height: 1;-->
<!--}-->

<!--.del-btn:hover { transform: scale(1.1); }-->

<!--.empty {-->
<!--  text-align: center;-->
<!--  color: #666;-->
<!--  font-style: italic;-->
<!--  margin-top: 20px;-->
<!--}-->
<!--</style>-->

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  deleteField
} from 'firebase/firestore'
import { db } from '../firebase'

interface User {
  id: string
  name: string
  taken: boolean
  santaId?: string
  drawnTargetName?: string
}

const name = ref('')
const users = ref<User[]>([])
const loading = ref(false)

const usersRef = collection(db, 'users')
const q = query(usersRef, orderBy('name'))

let unsubscribe: () => void

onMounted(() => {
  unsubscribe = onSnapshot(q, (snapshot) => {
    users.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as User))
  })
})

onUnmounted(() => unsubscribe?.())

const addUser = async () => {
  if (!name.value.trim()) return
  loading.value = true
  try {
    await addDoc(usersRef, { name: name.value.trim(), taken: false, santaId: '', drawnTargetName: '' })
    name.value = ''
  } finally {
    loading.value = false
  }
}

const removeUser = async (id: string) => {
  if (confirm('Удалить участника?')) {
    await deleteDoc(doc(db, 'users', id))
  }
}

const resetStatus = async (id: string) => {
  await updateDoc(doc(db, 'users', id), {
    taken: false,
    santaId: deleteField(),
    drawnTargetName: deleteField()
  })
}
</script>

<template>
  <div class="card">
    <h1>🎅 Админка</h1>

    <div class="form-row">
      <input
          v-model="name"
          @keydown.enter="addUser"
          placeholder="Имя участника"
          :disabled="loading"
      />
      <button class="add-btn" @click="addUser" :disabled="!name || loading">+</button>
    </div>

    <div class="list-container">
      <ul class="list">
        <li v-for="user in users" :key="user.id" :class="{ taken: user.taken }">
          <span class="user-name" @click="resetStatus(user.id)" title="Нажми чтобы сбросить статус">
            {{ user.name }}
            <small v-if="user.taken">🎁 (занят)</small>
            <small v-if="user.drawnTargetName">✓ Выбрал</small>
          </span>
          <button class="del-btn" @click="removeUser(user.id)">×</button>
        </li>
      </ul>
      <div v-if="users.length === 0" class="empty">Список пуст</div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-width: 90%;
  width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
}

h1 {
  color: var(--green);
  margin-top: 0;
  margin-bottom: 1.5rem;
  text-shadow: 1px 1px 0 rgba(255,255,255,0.5);
  font-weight: 700;
  text-align: center;
}

.form-row {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  outline: none;
  transition: background 0.3s;
  font-family: sans-serif;
}

input:focus {
  border-color: var(--green);
  background: rgba(255, 255, 255, 0.85);
}

.add-btn {
  padding: 0 20px;
  font-size: 1.5rem;
  background: var(--green);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 0 #0f4224;
  transition: transform 0.1s;
}

.add-btn:active { transform: translateY(4px); box-shadow: none; }
.add-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.list-container {
  overflow-y: auto;
  padding-right: 5px;
}

/* Стилизация скроллбара */
.list-container::-webkit-scrollbar { width: 6px; }
.list-container::-webkit-scrollbar-thumb { background: var(--green); border-radius: 3px; }
.list-container::-webkit-scrollbar-track { background: rgba(255,255,255,0.3); }

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background: rgba(255, 255, 255, 0.6);
  margin-bottom: 8px;
  border-radius: 10px;
  transition: all 0.2s;
}

li:hover {
  background: rgba(255, 255, 255, 0.9);
}

.user-name {
  font-weight: bold;
  color: #333;
  cursor: pointer;
  flex: 1;
  font-family: sans-serif;
}

li.taken .user-name {
  color: #888;
  text-decoration: line-through;
}

small {
  font-weight: normal;
  font-size: 0.8em;
  color: var(--red);
  text-decoration: none;
  display: inline-block;
  margin-left: 5px;
}

.del-btn {
  background: var(--red);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 10px;
  font-size: 1.2rem;
  line-height: 1;
}

.del-btn:hover { transform: scale(1.1); }

.empty {
  text-align: center;
  color: #666;
  font-style: italic;
  margin-top: 20px;
}
</style>