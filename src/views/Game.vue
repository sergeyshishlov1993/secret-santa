

<!--<script setup lang="ts">-->
<!--import { ref } from 'vue'-->
<!--import { collection, getDocs, runTransaction, doc } from 'firebase/firestore'-->
<!--import { db } from '../firebase'-->
<!--import logoImg from '../assets/logo.png'-->
<!--import logoImg2 from '../assets/logo2.png'-->

<!--interface User {-->
<!--  id: string-->
<!--  name: string-->
<!--  taken: boolean-->
<!--  santaId?: string-->
<!--}-->

<!--type SnowflakeStyle = Record<'&#45;&#45;left' | '&#45;&#45;size' | '&#45;&#45;duration' | '&#45;&#45;delay' | '&#45;&#45;opacity', string>-->

<!--const name = ref<string>('')-->
<!--const target = ref<string | null>(null)-->
<!--const error = ref<string>('')-->
<!--const loading = ref<boolean>(false)-->

<!--const getNormalizedSurname = (fullName: string): string => {-->
<!--  const surname = fullName.trim().split(/\s+/).pop()?.toLowerCase() || ''-->
<!--  return surname.replace(/(ая|яя|ый|ий|ой|а|я)$/, '')-->
<!--}-->

<!--const createSnowflakes = (count: number): SnowflakeStyle[] => {-->
<!--  let seed = 123456789-->
<!--  const next = (): number => {-->
<!--    seed = (seed * 1664525 + 1013904223) % 4294967296-->
<!--    return seed / 4294967296-->
<!--  }-->

<!--  const snowflakes: SnowflakeStyle[] = []-->
<!--  for (let index = 0; index < count; index += 1) {-->
<!--    const leftPercent = Math.round(next() * 100)-->
<!--    const sizePixels = 2 + Math.round(next() * 5)-->
<!--    const durationSeconds = 6 + Math.round(next() * 8)-->
<!--    const delaySeconds = -Math.round(next() * durationSeconds)-->
<!--    const opacityValue = (0.35 + next() * 0.55).toFixed(2)-->

<!--    snowflakes.push({-->
<!--      '&#45;&#45;left': `${leftPercent}%`,-->
<!--      '&#45;&#45;size': `${sizePixels}px`,-->
<!--      '&#45;&#45;duration': `${durationSeconds}s`,-->
<!--      '&#45;&#45;delay': `${delaySeconds}s`,-->
<!--      '&#45;&#45;opacity': `${opacityValue}`-->
<!--    })-->
<!--  }-->

<!--  return snowflakes-->
<!--}-->

<!--const snowflakes = ref<SnowflakeStyle[]>(createSnowflakes(36))-->

<!--const getSanta = async (): Promise<void> => {-->
<!--  const inputName = name.value.trim().toLowerCase()-->
<!--  if (!inputName) return-->

<!--  loading.value = true-->
<!--  error.value = ''-->
<!--  target.value = null-->

<!--  try {-->
<!--    const usersRef = collection(db, 'users')-->
<!--    const snapshot = await getDocs(usersRef)-->
<!--    const allUsers = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as User))-->

<!--    const me = allUsers.find(u => u.name.trim().toLowerCase() === inputName)-->
<!--    if (!me) {-->
<!--      throw new Error('Вас нет в списке участников! Попросите админа добавить вас.')-->
<!--    }-->

<!--    const mySurnameRoot = getNormalizedSurname(me.name)-->
<!--    const whoDrewMe = me.santaId-->

<!--    const candidates = allUsers.filter(u => {-->
<!--      if (u.taken) return false-->

<!--      const candidateNameFull = u.name.trim().toLowerCase()-->
<!--      const candidateSurnameRoot = getNormalizedSurname(u.name)-->

<!--      if (candidateNameFull === inputName) return false-->
<!--      if (candidateSurnameRoot === mySurnameRoot && mySurnameRoot.length > 2) return false-->
<!--      if (whoDrewMe && u.id === whoDrewMe) return false-->

<!--      return true-->
<!--    })-->

<!--    if (candidates.length === 0) {-->
<!--      throw new Error('Нет доступных участников! Похоже, вы последний или остались только родственники.')-->
<!--    }-->

<!--    const randomIndex = Math.floor(Math.random() * candidates.length)-->
<!--    const selectedUser = candidates[randomIndex]-->

<!--    if (!selectedUser) {-->
<!--      throw new Error('Ошибка выбора кандидата (внутренняя ошибка).')-->
<!--    }-->

<!--    await runTransaction(db, async (transaction) => {-->
<!--      const selectedRef = doc(db, 'users', selectedUser.id)-->
<!--      const freshDoc = await transaction.get(selectedRef)-->

<!--      if (!freshDoc.exists() || freshDoc.data().taken) {-->
<!--        throw new Error('Эльфы не успели, кто-то перехватил кандидата! Жми кнопку еще раз.')-->
<!--      }-->

<!--      transaction.update(selectedRef, {-->
<!--        taken: true,-->
<!--        santaId: me.id-->
<!--      })-->
<!--    })-->

<!--    target.value = selectedUser.name-->
<!--  } catch (e: unknown) {-->
<!--    if (e instanceof Error) error.value = e.message-->
<!--  } finally {-->
<!--    loading.value = false-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <div class="card">-->
<!--    <div class="snow" aria-hidden="true">-->
<!--      <span v-for="(styleVars, index) in snowflakes" :key="index" class="snowflake" :style="styleVars" />-->
<!--    </div>-->

<!--    <div v-if="!target">-->
<!--      <div class="header-row">-->
<!--        <img :src="logoImg2" alt="Secret Santa" class="logo" />-->
<!--        <h1>Secret Santa</h1>-->
<!--      </div>-->

<!--      <div class="input-group">-->
<!--        <input-->
<!--            v-model="name"-->
<!--            placeholder="Твое имя..."-->
<!--            :disabled="loading"-->
<!--            @keydown.enter="getSanta"-->
<!--        />-->
<!--      </div>-->

<!--      <button class="xmas-btn" @click="getSanta" :disabled="!name || loading">-->
<!--        {{ loading ? '🎄 Поиск...' : '🎁 Кто мне выпал ?' }}-->
<!--      </button>-->
<!--    </div>-->

<!--    <div v-else class="result fade-in">-->
<!--      <img :src="logoImg" alt="Secret Santa" class="logo1" />-->
<!--      <p>Ты — Тайный Санта для:</p>-->
<!--      <h2 class="target-name">{{ target }}</h2>-->
<!--    </div>-->

<!--    <div v-if="error" class="error shake">-->
<!--      {{ error }}-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped>-->
<!--.card {-->
<!--  position: relative;-->
<!--  overflow: hidden;-->
<!--  background: rgba(255, 255, 255, 0.15);-->
<!--  backdrop-filter: blur(4px);-->
<!--  -webkit-backdrop-filter: blur(4px);-->
<!--  border: 1px solid rgba(255, 255, 255, 0.15);-->
<!--  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);-->
<!--  padding: 1rem;-->
<!--  border-radius: 24px;-->
<!--  text-align: center;-->
<!--  max-width: 90%;-->
<!--  width: 360px;-->
<!--  margin: 0 auto;-->
<!--}-->

<!--.snow {-->
<!--  position: absolute;-->
<!--  inset: 0;-->
<!--  pointer-events: none;-->
<!--  z-index: 0;-->
<!--}-->

<!--.snowflake {-->
<!--  position: absolute;-->
<!--  top: -12px;-->
<!--  left: var(&#45;&#45;left);-->
<!--  width: var(&#45;&#45;size);-->
<!--  height: var(&#45;&#45;size);-->
<!--  border-radius: 50%;-->
<!--  background: rgba(255, 255, 255, 1);-->
<!--  opacity: var(&#45;&#45;opacity);-->
<!--  animation-name: snow-fall, snow-drift;-->
<!--  animation-duration: var(&#45;&#45;duration), calc(var(&#45;&#45;duration) * 0.7);-->
<!--  animation-timing-function: linear, ease-in-out;-->
<!--  animation-iteration-count: infinite, infinite;-->
<!--  animation-delay: var(&#45;&#45;delay), var(&#45;&#45;delay);-->
<!--  filter: drop-shadow(0 2px 6px rgba(255, 255, 255, 0.25));-->
<!--}-->

<!--@keyframes snow-fall {-->
<!--  to {-->
<!--    transform: translateY(520px);-->
<!--  }-->
<!--}-->

<!--@keyframes snow-drift {-->
<!--  0% { margin-left: 0; }-->
<!--  50% { margin-left: 14px; }-->
<!--  100% { margin-left: 0; }-->
<!--}-->

<!--.header-row {-->
<!--  position: relative;-->
<!--  z-index: 1;-->
<!--  width: 100%;-->
<!--  flex-direction: column;-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  gap: 5px;-->
<!--  margin-bottom: 1rem;-->
<!--}-->

<!--.target-name {-->
<!--  display: inline-block;-->
<!--  font-size: 4rem;-->
<!--  font-weight: 700;-->
<!--  line-height: 1.1;-->

<!--  background-image: url('@/assets/images.jpeg');-->
<!--  background-size: cover;-->
<!--  background-position: center;-->
<!--  -webkit-background-clip: text;-->
<!--  background-clip: text;-->

<!--  color: transparent;-->
<!--  -webkit-text-fill-color: transparent;-->

<!--  -webkit-text-stroke: 1px #fff;-->

<!--  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));-->
<!--}-->

<!--.logo {-->
<!--  max-width: 110px;-->
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
<!--  position: relative;-->
<!--  z-index: 1;-->
<!--  font-family: 'Mountains of Christmas', cursive !important;-->
<!--  color: var(&#45;&#45;green);-->
<!--  margin: 0;-->
<!--  text-shadow:-->
<!--      0 2px 3px #ffffff,-->
<!--      0 4px 10px rgba(255,255,255,0.9),-->
<!--      0 0 30px rgba(255,255,255,0.7);-->
<!--  font-weight: 700 !important;-->
<!--  font-size: 4rem !important;-->
<!--  line-height: 1;-->
<!--}-->

<!--.input-group {-->
<!--  position: relative;-->
<!--  z-index: 1;-->
<!--}-->

<!--input {-->
<!--  width: 100%;-->
<!--  height: 50px;-->
<!--  padding: 12px;-->
<!--  font-size: 1.6rem;-->
<!--  background: rgba(255, 255, 255, 0.5);-->
<!--  border: 1px solid rgba(255, 255, 255, 0.3);-->
<!--  border-radius: 16px;-->
<!--  margin-bottom: 1.5rem;-->
<!--  box-sizing: border-box;-->
<!--  outline: none;-->
<!--  text-align: center;-->
<!--  color: #181818;-->
<!--  transition: all 0.3s ease;-->
<!--}-->

<!--input::placeholder {-->
<!--  color: black;-->
<!--  font-size: 1.5rem;-->
<!--}-->

<!--input:focus {-->
<!--  border-color: var(&#45;&#45;green);-->
<!--  background: rgba(255, 255, 255, 0.85);-->
<!--  box-shadow: 0 4px 15px rgba(255,255,255,0.4);-->
<!--}-->

<!--.xmas-btn {-->
<!--  position: relative;-->
<!--  z-index: 1;-->
<!--  width: 100%;-->
<!--  height: 50px;-->
<!--  padding: 12px;-->
<!--  font-size: 1.4rem;-->
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

<!--.xmas-btn:active {-->
<!--  transform: translateY(1px);-->
<!--  box-shadow: 0 2px 10px rgba(22, 91, 51, 0.3);-->
<!--}-->

<!--.xmas-btn:disabled {-->
<!--  background: #6c8c7a;-->
<!--  box-shadow: none;-->
<!--  transform: none;-->
<!--  opacity: 0.7;-->
<!--  cursor: not-allowed;-->
<!--}-->

<!--.result {-->
<!--  position: relative;-->
<!--  z-index: 1;-->
<!--  margin-top: 1rem;-->
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

<!--.error {-->
<!--  position: relative;-->
<!--  z-index: 1;-->
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
  drawnTargetName?: string
}

type SnowflakeStyle = Record<'--left' | '--size' | '--duration' | '--delay' | '--opacity', string>

const name = ref<string>('')
const target = ref<string | null>(null)
const error = ref<string>('')
const loading = ref<boolean>(false)

const getNormalizedSurname = (fullName: string): string => {
  const surname = fullName.trim().split(/\s+/).pop()?.toLowerCase() || ''
  return surname.replace(/(ая|яя|ый|ий|ой|а|я)$/, '')
}

const createSnowflakes = (count: number): SnowflakeStyle[] => {
  let seed = 123456789
  const next = (): number => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }

  const snowflakes: SnowflakeStyle[] = []
  for (let index = 0; index < count; index += 1) {
    const leftPercent = Math.round(next() * 100)
    const sizePixels = 2 + Math.round(next() * 5)
    const durationSeconds = 6 + Math.round(next() * 8)
    const delaySeconds = -Math.round(next() * durationSeconds)
    const opacityValue = (0.35 + next() * 0.55).toFixed(2)

    snowflakes.push({
      '--left': `${leftPercent}%`,
      '--size': `${sizePixels}px`,
      '--duration': `${durationSeconds}s`,
      '--delay': `${delaySeconds}s`,
      '--opacity': `${opacityValue}`
    })
  }

  return snowflakes
}

const snowflakes = ref<SnowflakeStyle[]>(createSnowflakes(36))

const getSanta = async (): Promise<void> => {
  const inputName = name.value.trim().toLowerCase()
  if (!inputName) return

  loading.value = true
  error.value = ''
  target.value = null

  try {
    const usersRef = collection(db, 'users')
    const snapshot = await getDocs(usersRef)
    const allUsers = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as User))

    const me = allUsers.find(u => u.name.trim().toLowerCase() === inputName)
    if (!me) {
      throw new Error('Вас нет в списке участников! Попросите админа добавить вас.')
    }

    // Блокировка: Если пользователь уже выбрал, показываем результат и выходим
    if (me.drawnTargetName) {
      target.value = me.drawnTargetName
      return
    }

    const mySurnameRoot = getNormalizedSurname(me.name)
    const whoDrewMe = me.santaId

    // Попытка 1: Строгие правила (нет родственников, нет пар "меня выбрал")
    let candidates = allUsers.filter(u => {
      if (u.taken) return false // Исключаем, только если уже был выбран

      const candidateNameFull = u.name.trim().toLowerCase()
      const candidateSurnameRoot = getNormalizedSurname(u.name)

      if (candidateNameFull === inputName) return false
      if (candidateSurnameRoot === mySurnameRoot && mySurnameRoot.length > 2) return false
      if (whoDrewMe && u.id === whoDrewMe) return false

      return true
    })

    // Попытка 2: Ослабление правил (разрешаем родственников и пары, если нет других вариантов)
    if (candidates.length === 0) {
      candidates = allUsers.filter(u => {
        if (u.taken) return false // Исключаем, только если уже был выбран

        const candidateNameFull = u.name.trim().toLowerCase()

        if (candidateNameFull === inputName) return false

        // Разрешаем пару A <-> B (убрана проверка whoDrewMe)

        return true
      })

      if (candidates.length === 0) {
        throw new Error('Нет доступных участников! Похоже, вы последний.')
      }
    }

    const randomIndex = Math.floor(Math.random() * candidates.length)
    const selectedUser = candidates[randomIndex]

    if (!selectedUser) {
      throw new Error('Ошибка выбора кандидата (внутренняя ошибка).')
    }

    await runTransaction(db, async (transaction) => {
      const selectedRef = doc(db, 'users', selectedUser.id)
      const myRef = doc(db, 'users', me.id)

      const freshDoc = await transaction.get(selectedRef)
      const freshMe = await transaction.get(myRef)

      // Проверка на race condition:
      if (!freshDoc.exists() || freshDoc.data().taken) {
        throw new Error('Эльфы не успели, кто-то перехватил кандидата! Жми кнопку еще раз.')
      }

      if (!freshMe.exists()) {
        throw new Error('Ваш пользовательский документ не найден.')
      }

      const myData = freshMe.data() as User
      // Блокировка 2: Если транзакция обнаружит, что пользователь уже успел выбрать
      if (myData.drawnTargetName) {
        throw new Error('Вы уже получили своего Санту в другом окне/сессии.')
      }

      // Обновляем выбранного участника (получателя подарка):
      transaction.update(selectedRef, {
        taken: true,
        santaId: me.id
      })

      // Обновляем текущего участника (дарителя):
      transaction.update(myRef, {
        drawnTargetName: selectedUser.name
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
    <div class="snow" aria-hidden="true">
      <span v-for="(styleVars, index) in snowflakes" :key="index" class="snowflake" :style="styleVars" />
    </div>

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

      <button class="xmas-btn" @click="getSanta" :disabled="!name || loading">
        {{ loading ? '🎄 Поиск...' : '🎁 Кто мне выпал ?' }}
      </button>
    </div>

    <div v-else class="result fade-in">
      <img :src="logoImg" alt="Secret Santa" class="logo1" />
      <p>Ты — Тайный Санта для:</p>
      <h2 class="target-name">{{ target }}</h2>
      <div v-if="error" class="error shake" style="margin-top: 10px;">
        {{ error }}
      </div>
    </div>

    <div v-if="error && !target" class="error shake">
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  border-radius: 24px;
  text-align: center;
  max-width: 90%;
  width: 360px;
  margin: 0 auto;
}

.snow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.snowflake {
  position: absolute;
  top: -12px;
  left: var(--left);
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: rgba(255, 255, 255, 1);
  opacity: var(--opacity);
  animation-name: snow-fall, snow-drift;
  animation-duration: var(--duration), calc(var(--duration) * 0.7);
  animation-timing-function: linear, ease-in-out;
  animation-iteration-count: infinite, infinite;
  animation-delay: var(--delay), var(--delay);
  filter: drop-shadow(0 2px 6px rgba(255, 255, 255, 0.25));
}

@keyframes snow-fall {
  to {
    transform: translateY(520px);
  }
}

@keyframes snow-drift {
  0% { margin-left: 0; }
  50% { margin-left: 14px; }
  100% { margin-left: 0; }
}

.header-row {
  position: relative;
  z-index: 1;
  width: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-bottom: 1rem;
}

.target-name {
  display: inline-block;
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.1;

  background-image: url('@/assets/images.jpeg');
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
  background-clip: text;

  color: transparent;
  -webkit-text-fill-color: transparent;

  -webkit-text-stroke: 1px #fff;

  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
}

.logo {
  max-width: 110px;
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
  position: relative;
  z-index: 1;
  font-family: 'Mountains of Christmas', cursive !important;
  color: var(--green);
  margin: 0;
  text-shadow:
      0 2px 3px #ffffff,
      0 4px 10px rgba(255,255,255,0.9),
      0 0 30px rgba(255,255,255,0.7);
  font-weight: 700 !important;
  font-size: 4rem !important;
  line-height: 1;
}

.input-group {
  position: relative;
  z-index: 1;
}

input {
  width: 100%;
  height: 50px;
  padding: 12px;
  font-size: 1.6rem;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
  outline: none;
  text-align: center;
  color: #181818;
  transition: all 0.3s ease;
}

input::placeholder {
  color: black;
  font-size: 1.5rem;
}

input:focus {
  border-color: var(--green);
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 4px 15px rgba(255,255,255,0.4);
}

.xmas-btn {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 50px;
  padding: 12px;
  font-size: 1.4rem;
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

.xmas-btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 10px rgba(22, 91, 51, 0.3);
}

.xmas-btn:disabled {
  background: #6c8c7a;
  box-shadow: none;
  transform: none;
  opacity: 0.7;
  cursor: not-allowed;
}

.result {
  position: relative;
  z-index: 1;
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
  position: relative;
  z-index: 1;
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