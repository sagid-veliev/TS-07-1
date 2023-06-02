<template>
  <div>
    <button @click="openDialog">Open Dialog</button>
  </div>

  <!--@if "any dialogs are opened" -->
  <div v-show="dialogActive" id="app-dialog-root" class="dialog-root">
    <!--@for each dialog:-->
    <div class="wrapper">
      <!-- creating containers for each dialog -->
      <template v-if="dialogs.length">
        <div
            v-for="(dialog, index) in dialogs"
            :id="`dialog-${dialog.dialogId}`"
            :style="{ left: cascadeStyle(index), top: cascadeStyle(index) }"
        >
        </div>
      </template>
      <!-- dialog component goes here -->
    </div>
    <!--@end for each dialog-->
  </div>
  <!--@end if "any dialogs are opened" -->
</template>

<script lang="ts" setup>
import { ConfirmDialog } from "./dialog/ConfirmDialog";
import {Component, onMounted, reactive, Ref, ref} from "vue";
import {Dialog} from "./dialog/Dialog";

type DialogInstance = ConfirmDialog | ConfirmUserDeleteDialog | ConfirmUserAddDialog | ConfirmUserChangeDialog;

let dialogs: Component[] = reactive<DialogInstance[]>([]);
const dialogActive: Ref<boolean> = ref(false);

const cascadeStyle = (index) => {
  return `calc(50% + ${index * 10}px)`;
};

class ConfirmUserDeleteDialog extends ConfirmDialog {
  protected title = "Подтвердите удаление пользователя";
}
class ConfirmUserAddDialog extends ConfirmDialog {
  protected title = "Подтвердите добавление пользователя";
}
class ConfirmUserChangeDialog extends ConfirmDialog {
  protected title = "Подтвердите редактирование пользователя";
}

const openDialog = async () => {
  // функция изменена под множественное отображение диалогов.
  // реализация предполагает, что даже один диалог будет храниться в массиве
  // the function has been changed for multiple display of dialogs.
  // the implementation assumes that even one dialog will be stored in an array
  dialogActive.value = true;
  const results: Array<Promise<boolean>> = [];
  dialogs.forEach(dialog => {
    if (dialog instanceof Dialog) {
      results.push(dialog.open());
    }
  });
  Promise
    .all(results)
    .then((response: any) => {
      console.log(response);
      dialogActive.value = false;
    });
};

onMounted(() => {
  const dialog: ConfirmUserDeleteDialog = new ConfirmUserDeleteDialog();
  const dialog2: ConfirmUserAddDialog = new ConfirmUserAddDialog();
  const dialog3: ConfirmUserChangeDialog = new ConfirmUserChangeDialog();
  dialogs.push(dialog, dialog2, dialog3);
});

</script>
