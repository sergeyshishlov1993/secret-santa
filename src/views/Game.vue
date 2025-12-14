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
<!--      const myData = myDoc.data() as User-->
<!--      const myId = myDoc.id-->
<!--      const whoDrewMe = myData.santaId // ID человека, который уже вытянул меня (если есть)-->


<!--      const q = query(usersRef, where('taken', '==', false))-->
<!--      const snapshot = await getDocs(q)-->

<!--      const myNameFull = inputName.toLowerCase()-->
<!--      const mySurnameRoot = getNormalizedSurname(inputName)-->

<!--      const candidates: User[] = snapshot.docs-->
<!--          .map(d => ({ id: d.id, ...d.data() } as User))-->
<!--          .filter(u => {-->
<!--            const candidateNameFull = u.name.trim().toLowerCase()-->
<!--            const candidateSurnameRoot = getNormalizedSurname(u.name)-->

<!--            // Правило 1: Не я сам-->
<!--            if (candidateNameFull === myNameFull) return false-->

<!--            // Правило 2: Не однофамильцы-->
<!--            if (candidateSurnameRoot === mySurnameRoot && mySurnameRoot.length > 2) return false-->

<!--            // Правило 3 (АНТИ-КОЛЬЦО):-->
<!--            if (whoDrewMe && u.id === whoDrewMe) {-->

<!--              return false-->
<!--            }-->

<!--            return true-->
<!--          })-->


<!--      let finalCandidates = candidates;-->

<!--      if (candidates.length === 0 && whoDrewMe) {-->

<!--        throw new Error('Нет доступных участников! Похоже, вы последний или остались только родственники.')-->
<!--      }-->

<!--      const randomIndex = Math.floor(Math.random() * finalCandidates.length)-->
<!--      const selectedUser = finalCandidates[randomIndex]-->
<!--      const selectedRef = doc(db, 'users', selectedUser.id)-->

<!--      // 3. Проверка race condition-->
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
<!--          placeholder="Имя"-->
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
<!--      <img :src="logoImg" alt="Secret Santa" class="logo" />-->
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
<!--  background: rgba(255, 255, 255, 0.35);-->
<!--  backdrop-filter: blur(7px);-->
<!--  -webkit-backdrop-filter: blur(7px);-->
<!--  padding: 1rem;-->
<!--  border-radius: 20px;-->
<!--  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);-->
<!--  text-align: center;-->
<!--  border: 1px solid rgba(255, 255, 255, 0.3);-->
<!--  max-width: 90%;-->
<!--  width: 350px;-->
<!--  margin: 0 auto;-->
<!--}-->

<!--/* Flex контейнер для лого и текста */-->
<!--.header-row {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  gap: 15px;-->
<!--  margin-bottom: 2rem;-->
<!--}-->

<!--.logo {-->
<!--  max-width: 120px;-->
<!--  height: auto;-->
<!--  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));-->
<!--}-->

<!--h1 {-->
<!--  color: var(&#45;&#45;green);-->
<!--  margin: 0;-->
<!--  text-shadow: 1px 1px 0 rgba(255,255,255,0.5);-->
<!--  font-weight: 700;-->
<!--  font-size: 3.2rem;-->
<!--  line-height: 1;-->
<!--  text-align: left;-->
<!--}-->

<!--input {-->
<!--  width: 100%;-->
<!--  padding: 15px;-->
<!--  font-size: 1.1rem;-->
<!--  background: rgba(255, 255, 255, 0.5);-->
<!--  border: 2px solid rgba(255, 255, 255, 0.3);-->
<!--  border-radius: 12px;-->
<!--  margin-bottom: 1rem;-->
<!--  box-sizing: border-box;-->
<!--  outline: none;-->
<!--  text-align: center;-->
<!--  color: #000;-->
<!--  transition: background 0.3s;-->
<!--}-->

<!--input::placeholder { color: rgba(0, 0, 0, 0.6); }-->
<!--input:focus { border-color: var(&#45;&#45;green); background: rgba(255, 255, 255, 0.85); }-->

<!--.xmas-btn {-->
<!--  width: 100%;-->
<!--  padding: 15px;-->
<!--  font-size: 1.2rem;-->
<!--  background: var(&#45;&#45;green);-->
<!--  color: white;-->
<!--  border: none;-->
<!--  border-radius: 12px;-->
<!--  cursor: pointer;-->
<!--  transition: transform 0.2s;-->
<!--  box-shadow: 0 4px 0 #0f4224;-->
<!--}-->

<!--.xmas-btn:active { transform: translateY(4px); box-shadow: none; }-->
<!--.xmas-btn:disabled { background: #5a7a66; box-shadow: none; transform: none; opacity: 0.8; cursor: not-allowed; }-->

<!--.result {-->
<!--  margin-top: 2rem;-->
<!--  color: var(&#45;&#45;red);-->
<!--  text-shadow: 0 1px 2px rgba(255,255,255,0.8);-->
<!--}-->

<!--.result h2 {-->
<!--  font-size: 3rem;-->
<!--  margin: 0.5rem 0;-->
<!--  color: var(&#45;&#45;green);-->
<!--  font-weight: 800;-->
<!--  background: rgba(255,255,255,0.4);-->
<!--  padding: 8px;-->
<!--  border-radius: 8px;-->
<!--}-->

<!--.result p {-->
<!--  font-size: 1.3rem;-->
<!--  margin: 0.5rem 0;-->
<!--  color: var(&#45;&#45;red);-->
<!--  font-weight: 400;-->
<!--  background: rgba(255,255,255,0.4);-->
<!--  padding: 8px;-->
<!--  border-radius: 8px;-->
<!--}-->




<!--.error {-->
<!--  margin-top: 1rem;-->
<!--  color: #fff;-->
<!--  background: rgba(212, 36, 38, 0.8);-->
<!--  padding: 10px;-->
<!--  border-radius: 8px;-->
<!--  font-weight: bold;-->
<!--}-->

<!--.fade-in { animation: fadeIn 0.5s ease-out; }-->
<!--@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }-->
<!--</style>-->

<script setup lang="ts">
import { ref } from 'vue'
import { collection, query, where, getDocs, runTransaction, doc } from 'firebase/firestore'
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
  const inputName = name.value.trim()
  if (!inputName) return

  loading.value = true
  error.value = ''
  target.value = null

  try {
    await runTransaction(db, async (transaction) => {
      const usersRef = collection(db, 'users')

      const myNameQuery = query(usersRef, where('name', '==', inputName))
      const mySnapshot = await getDocs(myNameQuery)

      if (mySnapshot.empty) {
        throw new Error('Вас нет в списке участников! Попросите админа добавить вас.')
      }

      const myDoc = mySnapshot.docs[0]
      const myData = myDoc.data() as User
      const myId = myDoc.id
      const whoDrewMe = myData.santaId

      const q = query(usersRef, where('taken', '==', false))
      const snapshot = await getDocs(q)

      const myNameFull = inputName.toLowerCase()
      const mySurnameRoot = getNormalizedSurname(inputName)

      const candidates: User[] = snapshot.docs
          .map(d => ({ id: d.id, ...d.data() } as User))
          .filter(u => {
            const candidateNameFull = u.name.trim().toLowerCase()
            const candidateSurnameRoot = getNormalizedSurname(u.name)

            if (candidateNameFull === myNameFull) return false
            if (candidateSurnameRoot === mySurnameRoot && mySurnameRoot.length > 2) return false
            if (whoDrewMe && u.id === whoDrewMe) return false
            return true
          })

      if (candidates.length === 0) {
        throw new Error('Нет доступных участников! Похоже, вы последний или остались только родственники.')
      }

      const randomIndex = Math.floor(Math.random() * candidates.length)
      const selectedUser = candidates[randomIndex]
      const selectedRef = doc(db, 'users', selectedUser.id)

      const freshDoc = await transaction.get(selectedRef)
      if (freshDoc.exists() && freshDoc.data().taken) {
        throw new Error('Эльфы не успели, попробуй снова!')
      }

      transaction.update(selectedRef, {
        taken: true,
        santaId: myId
      })

      target.value = selectedUser.name
    })
  } catch (e: unknown) {
    if (e instanceof Error) error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="card">
    <div class="header-row">
      <img :src="logoImg2" alt="Secret Santa" class="logo" />
      <h1>Secret Santa</h1>
    </div>

    <div class="input-group">
      <input
          v-model="name"
          placeholder="Твое имя..."
          :disabled="loading || !!target"
          @keydown.enter="getSanta"
      />
    </div>

    <button
        class="xmas-btn"
        @click="getSanta"
        :disabled="!name || loading || !!target"
    >
      {{ loading ? '🎄 Поиск...' : '🎁 Кто мне выпал ?' }}
    </button>

    <div v-if="target" class="result fade-in">
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
  /* Очень легкое, едва заметное стекло */
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  /* Тончайшая граница */
  border: 1px solid rgba(255, 255, 255, 0.15);

  /* Очень мягкая тень, чтобы не было ощущения "кирпича" */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);

  padding: 1.5rem;
  border-radius: 24px;
  text-align: center;
  max-width: 90%;
  width: 360px;
  margin: 0 auto;
}

/* Шапка */
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
  color: var(--green);
  margin: 0;
  text-shadow: 0 2px 15px rgba(255,255,255,0.8);
  font-weight: 700;
  font-size: 3.2rem;
  line-height: 1;
}

/* Инпут */
input {
  width: 100%;
  padding: 12px;
  font-size: 1.6rem;
  /* Полупрозрачный фон для инпута */
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
  font-size: 1.8rem;
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
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255,255,255,0.15); /* Едва заметный разделитель */
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

/* Ошибки */
.error {
  margin-top: 1.5rem;
  color: #fff;
  background: rgba(212, 36, 38, 0.8);
  padding: 10px;
  border-radius: 12px;
  font-size: 1.4rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

/* Анимации */
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



