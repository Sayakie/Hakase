import { SlashCommandBuilder } from '@discordjs/builders'

import { FormFlag } from '../../../util/Constant.js'

export const searchCommand = new SlashCommandBuilder()
  .setName(`검색`)
  .setDescription(`포켓몬을 검색합니다. 다양한 형태의 포켓몬들을 만나보세요!`)
  .setDefaultPermission(true)
  .addStringOption(option =>
    option
      .setName(`이름`)
      .setDescription(`검색할 포켓몬 이름을 입력하세요.`)
      .setRequired(true)
  )
  .addStringOption(option =>
    option
      .setName(`타입`)
      .setDescription(`검색할 포켓몬의 형태를 입력하세요.`)
      .setRequired(false)
      .addChoice(`메가`, FormFlag.MegaForm)
  )
