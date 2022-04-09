import i18next from 'i18next'

export const useI18n = async (): Promise<void> => {
  await i18next.use().init()
}
