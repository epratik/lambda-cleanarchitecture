export interface ISendConfirmationMailUseCase{
    execute(): Promise<void>;
}