<!--<script setup lang="ts">-->
<!--import { ref } from 'vue'-->
<!--import { collection, query, where, getDocs, runTransaction, doc } from 'firebase/firestore'-->
<!--import { db } from '../firebase'-->
<!--import logoImg from '../assets/logo.png'-->
<!--import logoImg2 from '../assets/logo2.png'-->

<!--interface User {-->
<!--  id: string-->
<!--  name: string-->
<!--  taken: boolean-->
<!--  santaId?: string-->
<!--}-->

<!--const name = ref('')-->
<!--const target = ref<string | null>(null)-->
<!--const error = ref('')-->
<!--const loading = ref(false)-->

<!--const getNormalizedSurname = (fullName: string) => {-->
<!--  const surname = fullName.trim().split(/\s+/).pop()?.toLowerCase() || ''-->
<!--  return surname.replace(/(ая|яя|ый|ий|ой|а|я)$/, '')-->
<!--}-->

<!--const getSanta = async () => {-->
<!--  const inputName = name.value.trim()-->
<!--  if (!inputName) return-->

<!--  loading.value = true-->
<!--  error.value = ''-->
<!--  target.value = null-->

<!--  try {-->
<!--    await runTransaction(db, async (transaction) => {-->
<!--      const usersRef = collection(db, 'users')-->

<!--      const myNameQuery = query(usersRef, where('name', '==', inputName))-->
<!--      const mySnapshot = await getDocs(myNameQuery)-->

<!--      if (mySnapshot.empty) {-->
<!--        throw new Error('Вас нет в списке участников! Попросите админа добавить вас.')-->
<!--      }-->

<!--      const myDoc = mySnapshot.docs[0]-->
<!--      if (!myDoc) throw new Error('Ошибка получения данных пользователя')-->

<!--      const myData = myDoc.data() as User-->
<!--      const myId = myDoc.id-->
<!--      const whoDrewMe = myData.santaId-->

<!--      const q = query(usersRef, where('taken', '==', false))-->
<!--      const snapshot = await getDocs(q)-->

<!--      const myNameFull = inputName.toLowerCase()-->
<!--      const mySurnameRoot = getNormalizedSurname(inputName)-->

<!--      const candidates: User[] = snapshot.docs-->
<!--          .map(d => ({ id: d.id, ...d.data() } as User))-->
<!--          .filter(u => {-->
<!--            const candidateNameFull = u.name.trim().toLowerCase()-->
<!--            const candidateSurnameRoot = getNormalizedSurname(u.name)-->

<!--            if (candidateNameFull === myNameFull) return false-->
<!--            if (candidateSurnameRoot === mySurnameRoot && mySurnameRoot.length > 2) return false-->
<!--            if (whoDrewMe && u.id === whoDrewMe) return false-->
<!--            return true-->
<!--          })-->

<!--      if (candidates.length === 0) {-->
<!--        throw new Error('Нет доступных участников! Похоже, вы последний или остались только родственники.')-->
<!--      }-->

<!--      const randomIndex = Math.floor(Math.random() * candidates.length)-->
<!--      const selectedUser = candidates[randomIndex]-->

<!--      if (!selectedUser) throw new Error('Ошибка выбора кандидата')-->

<!--      const selectedRef = doc(db, 'users', selectedUser.id)-->

<!--      const freshDoc = await transaction.get(selectedRef)-->
<!--      if (freshDoc.exists() && freshDoc.data().taken) {-->
<!--        throw new Error('Эльфы не успели, попробуй снова!')-->
<!--      }-->

<!--      transaction.update(selectedRef, {-->
<!--        taken: true,-->
<!--        santaId: myId-->
<!--      })-->

<!--      target.value = selectedUser.name-->
<!--    })-->
<!--  } catch (e: unknown) {-->
<!--    if (e instanceof Error) error.value = e.message-->
<!--  } finally {-->
<!--    loading.value = false-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <div class="card">-->
<!--    <div class="header-row">-->
<!--      <img :src="logoImg2" alt="Secret Santa" class="logo" />-->
<!--      <h1>Secret Santa</h1>-->
<!--    </div>-->

<!--    <div class="input-group">-->
<!--      <input-->
<!--          v-model="name"-->
<!--          placeholder="Твое имя..."-->
<!--          :disabled="loading || !!target"-->
<!--          @keydown.enter="getSanta"-->
<!--      />-->
<!--    </div>-->

<!--    <button-->
<!--        class="xmas-btn"-->
<!--        @click="getSanta"-->
<!--        :disabled="!name || loading || !!target"-->
<!--    >-->
<!--      {{ loading ? '🎄 Поиск...' : '🎁 Кто мне выпал ?' }}-->
<!--    </button>-->

<!--    <div v-if="target" class="result fade-in">-->
<!--      <img :src="logoImg" alt="Secret Santa" class="logo1" />-->
<!--      <p>Ты — Тайный Санта для:</p>-->
<!--      <h2>{{ target }}</h2>-->
<!--    </div>-->

<!--    <div v-if="error" class="error shake">-->
<!--      {{ error }}-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped>-->
<!--.card {-->
<!--  background: rgba(255, 255, 255, 0.15);-->
<!--  backdrop-filter: blur(6px);-->
<!--  -webkit-backdrop-filter: blur(6px);-->


<!--  border: 1px solid rgba(255, 255, 255, 0.15);-->


<!--  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);-->

<!--  padding: 1.5rem;-->
<!--  border-radius: 24px;-->
<!--  text-align: center;-->
<!--  max-width: 90%;-->
<!--  width: 360px;-->
<!--  margin: 0 auto;-->
<!--}-->


<!--.header-row {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  gap: 12px;-->
<!--  margin-bottom: 2rem;-->
<!--}-->

<!--.logo {-->
<!--  max-width: 100px;-->
<!--  height: auto;-->
<!--  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));-->
<!--}-->

<!--.logo1 {-->
<!--  max-width: 80px;-->
<!--  height: auto;-->
<!--  margin-bottom: 10px;-->
<!--  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));-->
<!--}-->

<!--h1 {-->
<!--  font-family: 'Mountains of Christmas', cursive !important;-->
<!--  color: var(&#45;&#45;green);-->
<!--  margin: 0;-->
<!--  text-shadow:-->
<!--      0 2px 3px #ffffff,-->
<!--      0 4px 10px rgba(255,255,255,0.9),-->
<!--      0 0 30px rgba(255,255,255,0.7);-->
<!--  font-weight: 700 !important;-->
<!--  font-size: 3rem !important;-->
<!--  line-height: 1;-->
<!--}-->


<!--input {-->
<!--  width: 100%;-->
<!--  padding: 12px;-->
<!--  font-size: 1.6rem;-->
<!--  background: rgba(255, 255, 255, 0.5);-->
<!--  border: 1px solid rgba(255, 255, 255, 0.3);-->
<!--  border-radius: 16px;-->
<!--  margin-bottom: 1.5rem;-->
<!--  box-sizing: border-box;-->
<!--  outline: none;-->
<!--  text-align: center;-->
<!--  color: #1a4d2e;-->
<!--  transition: all 0.3s ease;-->
<!--}-->

<!--input::placeholder { color: rgba(22, 91, 51, 0.6); font-size: 1.5rem; }-->
<!--input:focus {-->
<!--  border-color: var(&#45;&#45;green);-->
<!--  background: rgba(255, 255, 255, 0.85);-->
<!--  box-shadow: 0 4px 15px rgba(255,255,255,0.4);-->
<!--}-->

<!--.xmas-btn {-->
<!--  width: 100%;-->
<!--  padding: 12px;-->
<!--  font-size: 1rem;-->
<!--  background: var(&#45;&#45;green);-->
<!--  color: white;-->
<!--  border: none;-->
<!--  border-radius: 16px;-->
<!--  cursor: pointer;-->
<!--  transition: all 0.3s ease;-->
<!--  box-shadow: 0 4px 15px rgba(22, 91, 51, 0.3);-->
<!--  text-shadow: 0 1px 2px rgba(0,0,0,0.2);-->
<!--}-->

<!--.xmas-btn:hover {-->
<!--  transform: translateY(-2px);-->
<!--  box-shadow: 0 6px 20px rgba(22, 91, 51, 0.5);-->
<!--}-->

<!--.xmas-btn:active { transform: translateY(1px); box-shadow: 0 2px 10px rgba(22, 91, 51, 0.3); }-->
<!--.xmas-btn:disabled { background: #6c8c7a; box-shadow: none; transform: none; opacity: 0.7; cursor: not-allowed; }-->

<!--/* Результат */-->
<!--.result {-->
<!--  margin-top: 2rem;-->
<!--  padding-top: 1rem;-->
<!--  border-top: 1px solid rgba(255,255,255,0.15); /* Едва заметный разделитель */-->
<!--}-->

<!--.result p {-->
<!--  font-size: 1.8rem;-->
<!--  margin: 0;-->
<!--  color: #fff;-->
<!--  font-weight: 400;-->
<!--  text-shadow: 0 1px 3px rgba(0,0,0,0.3);-->
<!--}-->

<!--.result h2 {-->
<!--  font-size: 4rem;-->
<!--  margin: 0.5rem 0 0 0;-->
<!--  color: var(&#45;&#45;white);-->
<!--  font-weight: 700;-->
<!--  text-shadow: 0 2px 10px rgba(0,0,0,0.2), 0 0 20px rgba(255,215,0, 0.3);-->
<!--  line-height: 1.1;-->
<!--  transform: rotate(-2deg);-->
<!--}-->

<!--/* Ошибки */-->
<!--.error {-->
<!--  margin-top: 1.5rem;-->
<!--  color: #fff;-->
<!--  background: rgba(212, 36, 38, 0.8);-->
<!--  padding: 10px;-->
<!--  border-radius: 12px;-->
<!--  font-size: 1.4rem;-->
<!--  box-shadow: 0 4px 10px rgba(0,0,0,0.15);-->
<!--}-->

<!--.fade-in { animation: fadeIn 0.8s cubic-bezier(0.19, 1, 0.22, 1); }-->
<!--@keyframes fadeIn {-->
<!--  from { opacity: 0; transform: translateY(20px) scale(0.95); }-->
<!--  to { opacity: 1; transform: translateY(0) scale(1); }-->
<!--}-->

<!--.shake { animation: shake 0.5s; }-->
<!--@keyframes shake {-->
<!--  0% { transform: translateX(0); }-->
<!--  25% { transform: translateX(-5px); }-->
<!--  50% { transform: translateX(5px); }-->
<!--  75% { transform: translateX(-5px); }-->
<!--  100% { transform: translateX(0); }-->
<!--}-->
<!--</style>-->


<script setup lang="ts">
import { ref } from 'vue'
import { collection, getDocs, runTransaction, doc } from 'firebase/firestore'
import { db } from '../firebase'
import logoImg from '../assets/logo.png'
import logoImg2 from '../assets/logo2.png'

interface User {
  id: string
  name: string
  taken: boolean
  santaId?: string
}

const name = ref('')
const target = ref<string | null>(null)
const error = ref('')
const loading = ref(false)

const getNormalizedSurname = (fullName: string) => {
  const surname = fullName.trim().split(/\s+/).pop()?.toLowerCase() || ''
  return surname.replace(/(ая|яя|ый|ий|ой|а|я)$/, '')
}

const getSanta = async () => {
  const inputName = name.value.trim().toLowerCase() // 1. Сразу приводим ввод к нижнему регистру
  if (!inputName) return

  loading.value = true
  error.value = ''
  target.value = null

  try {
    // Сначала получаем ВСЕХ пользователей, чтобы найти себя без учета регистра
    // (Firestore не умеет искать case-insensitive из коробки, поэтому делаем это в JS)
    const usersRef = collection(db, 'users')
    const snapshot = await getDocs(usersRef)
    const allUsers = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as User))

    // 2. Ищем себя в списке (сравниваем lowerCase имена)
    const me = allUsers.find(u => u.name.trim().toLowerCase() === inputName)

    if (!me) {
      throw new Error('Вас нет в списке участников! Попросите админа добавить вас.')
    }

    const mySurnameRoot = getNormalizedSurname(me.name)
    const whoDrewMe = me.santaId

    // 3. Фильтруем кандидатов из того же списка
    const candidates = allUsers.filter(u => {
      // Исключаем занятых
      if (u.taken) return false

      const candidateNameFull = u.name.trim().toLowerCase()
      const candidateSurnameRoot = getNormalizedSurname(u.name)

      // Правило 1: Не я сам
      if (candidateNameFull === inputName) return false

      // Правило 2: Не однофамильцы
      if (candidateSurnameRoot === mySurnameRoot && mySurnameRoot.length > 2) return false

      // Правило 3: Анти-кольцо
      if (whoDrewMe && u.id === whoDrewMe) return false

      return true
    })

    if (candidates.length === 0) {
      throw new Error('Нет доступных участников! Похоже, вы последний или остались только родственники.')
    }

    // Выбираем кандидата
    const randomIndex = Math.floor(Math.random() * candidates.length)
    const selectedUser = candidates[randomIndex]

    // 4. Выполняем транзакцию только для записи (проверка на гонку)
    await runTransaction(db, async (transaction) => {
      const selectedRef = doc(db, 'users', selectedUser.id)
      const freshDoc = await transaction.get(selectedRef)

      if (!freshDoc.exists() || freshDoc.data().taken) {
        throw new Error('Эльфы не успели, кто-то перехватил кандидата! Жми кнопку еще раз.')
      }

      transaction.update(selectedRef, {
        taken: true,
        santaId: me.id
      })
    })

    target.value = selectedUser.name

  } catch (e: unknown) {
    if (e instanceof Error) error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="card">

    <div v-if="!target">
      <div class="header-row">
        <img :src="logoImg2" alt="Secret Santa" class="logo" />
        <h1>Secret Santa</h1>
      </div>

      <div class="input-group">
        <input
            v-model="name"
            placeholder="Твое имя..."
            :disabled="loading"
            @keydown.enter="getSanta"
        />
      </div>

      <button
          class="xmas-btn"
          @click="getSanta"
          :disabled="!name || loading"
      >
        {{ loading ? '🎄 Поиск...' : '🎁 Кто мне выпал ?' }}
      </button>
    </div>

    <div v-else class="result fade-in">
      <img :src="logoImg" alt="Secret Santa" class="logo1" />
      <p>Ты — Тайный Санта для:</p>
      <h2>{{ target }}</h2>
    </div>

    <div v-if="error" class="error shake">
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
.card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  border-radius: 24px;
  text-align: center;
  max-width: 90%;
  width: 360px;
  margin: 0 auto;
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 2rem;
}

.logo {
  max-width: 90px;
  height: auto;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
}

.logo1 {
  max-width: 80px;
  height: auto;
  margin-bottom: 10px;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
}

h1 {
  font-family: 'Mountains of Christmas', cursive !important;
  color: var(--green);
  margin: 0;
  text-shadow:
      0 2px 3px #ffffff,
      0 4px 10px rgba(255,255,255,0.9),
      0 0 30px rgba(255,255,255,0.7);
  font-weight: 700 !important;
  font-size: 3rem !important;
  line-height: 1;
}

input {
  width: 100%;
  padding: 12px;
  font-size: 1.6rem;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
  outline: none;
  text-align: center;
  color: #1a4d2e;
  transition: all 0.3s ease;
}

input::placeholder { color: rgba(22, 91, 51, 0.6); font-size: 1.5rem; }
input:focus {
  border-color: var(--green);
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 4px 15px rgba(255,255,255,0.4);
}

.xmas-btn {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  background: var(--green);
  color: white;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(22, 91, 51, 0.3);
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.xmas-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(22, 91, 51, 0.5);
}

.xmas-btn:active { transform: translateY(1px); box-shadow: 0 2px 10px rgba(22, 91, 51, 0.3); }
.xmas-btn:disabled { background: #6c8c7a; box-shadow: none; transform: none; opacity: 0.7; cursor: not-allowed; }

/* Результат */
.result {
  /* Убрал верхний border, так как теперь это единственный контент */
  margin-top: 1rem;
}

.result p {
  font-size: 1.8rem;
  margin: 0;
  color: #fff;
  font-weight: 400;
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.result h2 {
  font-size: 4rem;
  margin: 0.5rem 0 0 0;
  color: var(--white);
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0,0,0,0.2), 0 0 20px rgba(255,215,0, 0.3);
  line-height: 1.1;
  transform: rotate(-2deg);
}

.error {
  margin-top: 1.5rem;
  color: #fff;
  background: rgba(212, 36, 38, 0.8);
  padding: 10px;
  border-radius: 12px;
  font-size: 1.4rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.fade-in { animation: fadeIn 0.8s cubic-bezier(0.19, 1, 0.22, 1); }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.shake { animation: shake 0.5s; }
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}
</style>