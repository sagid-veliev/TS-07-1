<template>
  <div class="dialog">
    <header>
      <span>Dialog</span>
    </header>
    <main>
      <span>{{ title }}</span>
    </main>
    <footer>
      <!--on click resolve -> false-->
      <button @click="onCancel">Отмена</button>

      <!--on click resolve -> true-->
      <button @click="onConfirm">Подтвердить</button>
    </footer>
  </div>
</template>

<script setup>
// TODO: implement
defineProps({
  title: {
    type: String,
    required: true,
  },
  onCancel: {
    type: Function,
    required: true,
  },
  onConfirm: {
    type: Function,
    required: true,
  },
})
</script>

<style lang="sass">
.dialog
  display: flex
  flex-direction: column
  width: 600px
  border: 1px solid var(--border-color)
  background: white
  & > *
      display: flex
      justify-content: space-between
      align-items: center
      padding: 0.5rem
      &:not(:last-child)
          border-bottom: 1px solid var(--border-color)
          border-radius: 0
  & > header
      font-weight: bold
      border-bottom: 1px solid var(--border-color)
  & > main
      padding: 1rem 0.5rem
</style>
