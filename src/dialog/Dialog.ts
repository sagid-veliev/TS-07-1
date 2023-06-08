import {Component, ComponentOptions, createApp} from 'vue';
import ConfirmDialogComponent from './ConfirmDialogComponent.vue';

export class Dialog {
    // TODO: implement
    protected component: Component | null;
    protected title: string;
    protected componentInstance: ComponentOptions | null;
    protected resolveFunc: ((value: boolean) => void) | null;
    // create an ID for each dialog
    protected dialogId: number = Math.floor(Math.random() * 1000);

    constructor() {
        this.component = null;
        this.componentInstance = null;
        this.resolveFunc = null;
        this.title = 'Диалоговое окно';
    }

    open(): Promise<boolean> {
        return new Promise((resolve) => {
            this.createDialog();
            this.resolveFunc = resolve;
        })
    }

    createDialog(): void {
        this.componentInstance = createApp(ConfirmDialogComponent, {
            title: this.title,
            onCancel: this.handleCancel.bind(this),
            onConfirm: this.handleConfirm.bind(this),
        });
        // use a dialog ID to create a container for this dialog
        this.componentInstance.mount(`#dialog-${this.dialogId}`);
    }

    protected handleCancel(): void {
        this.closeDialog(false);
    }

    protected handleConfirm(): void {
        this.closeDialog(true);
    }

    protected closeDialog(value: boolean): void {
        // unmount component after selection
        if (this.componentInstance) {
            this.componentInstance.unmount();
            this.componentInstance = null;
        }
        // reset the function after destruction of component
        if (this.resolveFunc) {
            this.resolveFunc(value);
            this.resolveFunc = null;
        }
    }
}
