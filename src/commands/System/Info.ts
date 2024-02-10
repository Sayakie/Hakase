import { type CpuInfo, cpus, uptime as osUptime } from "node:os";
import { memoryUsage, uptime as processUptime } from "node:process";

import { TimestampStyles, time } from "@discordjs/builders";
import { ApplyOptions as Mixin } from "@sapphire/decorators";
import {
  type ChatInputCommand,
  RegisterBehavior,
  version as sapphireVersion,
} from "@sapphire/framework";
import { Duration } from "@sapphire/time-utilities";
import { Locale } from "discord-api-types/v10";
import { EmbedBuilder, version } from "discord.js";

import { LocalizableCommand } from "#lib/structures/LocalizableCommand.js";
import { BrandingColors, MemoryUnits } from "#lib/utils/constants.js";

@Mixin<ChatInputCommand.Options>({
  description:
    "Provides information about Hakase, and links for adding the bot and joining the support server.",
  descriptionLocalizations: {
    ko: "Hakase 봇에 대한 정보와 봇 추가 링크와 도움을 받을 수 있는 디스코드 서버 링크를 보여줍니다.",
  },
  nameLocalizations: {
    ko: "정보",
  },
})
export class SlashCommand extends LocalizableCommand {
  private get titles(): { [P in `${Locale}`]?: Titles } {
    return {
      [Locale.EnglishUS]: {
        serverUsage: "Server Usage",
        stats: "Statistics",
        uptime: "Uptime",
      },
      [Locale.Korean]: {
        serverUsage: "서버 자원 사용량",
        stats: "봇 통계",
        uptime: "서버 가동 시간",
      },
    };
  }

  private get fields(): { [P in `${Locale}`]?: Fields } {
    return {
      [Locale.EnglishUS]: {
        serverUsage: (usage) =>
          [
            `• **CPU Load**: ${usage.cpuLoad}`,
            `• **Heap**: ${usage.ramUsed}MB (Total: ${usage.ramTotal}MB)`,
          ].join("\n"),
        stats: (stats) =>
          [
            `• **Users**: ${stats.users}`,
            `• **Guilds**: ${stats.guilds}`,
            `• **Channels**: ${stats.channels}`,
            `• **Node.js**: ${stats.nodeJs}`,
            `• **Discord.js**: ${stats.version}`,
            `• **Sapphire Framework**: ${stats.sapphireVersion}`,
          ].join("\n"),
        uptime: (uptime) =>
          [
            `• **Host**: ${uptime.host}`,
            `• **Total**: ${uptime.total}`,
            `• **Client**: ${uptime.client}`,
          ].join("\n"),
      },
      [Locale.Korean]: {
        serverUsage: (usage) =>
          [
            `• **CPU 사용률**: ${usage.cpuLoad}`,
            `• **메모리 사용량**: ${usage.ramUsed}MB (Total: ${usage.ramTotal}MB)`,
          ].join("\n"),
        stats: (stats) =>
          [
            `• **유저 수**: ${stats.users}`,
            `• **서버 수**: ${stats.guilds}`,
            `• **채널 수**: ${stats.channels}`,
            `• **Node.js**: ${stats.nodeJs}`,
            `• **Discord.js**: ${stats.version}`,
            `• **Sapphire Framework**: ${stats.sapphireVersion}`,
          ].join("\n"),
        uptime: (uptime) =>
          [
            `• **호스트 서버**: ${uptime.host}`,
            `• **프로세스**: ${uptime.total}`,
            `• **봇**: ${uptime.client}`,
          ].join("\n"),
      },
    };
  }

  private get generalStatistics(): GeneralStatistics {
    const { client } = this.container;

    return {
      channels: client.channels.cache.size,
      guilds: client.guilds.cache.size,
      nodeJs: process.version,
      sapphireVersion: `v${sapphireVersion}`,
      users: client.guilds.cache.reduce(
        (acc, val) => acc + (val.memberCount || 0),
        0,
      ),
      version: `v${version}`,
    };
  }

  private get uptimeStatistics(): UptimeStatistics {
    const now = Date.now();

    const { offset: hostOffset } = new Duration(`${osUptime()} seconds`);

    const { offset: processOffset } = new Duration(
      `${processUptime()} seconds`,
    );

    return {
      client: time(
        new Date(now - this.container.client.uptime),
        TimestampStyles.RelativeTime,
      ),
      host: time(new Date(now - hostOffset), TimestampStyles.RelativeTime),
      total: time(new Date(now - processOffset), TimestampStyles.RelativeTime),
    };
  }

  private get usageStatistics(): UsageStatistics {
    const usage = memoryUsage();

    return {
      cpuLoad: cpus().map(SlashCommand.formatCpuInfo.bind(null)).join(" | "),
      ramTotal: (usage.heapTotal / MemoryUnits.MiB).toFixed(2),
      ramUsed: (usage.heapUsed / MemoryUnits.MiB).toFixed(2),
    };
  }

  private static formatCpuInfo({ times }: CpuInfo): `${string}%` {
    return `${
      ~~(
        ((times.user + times.nice + times.sys + times.irq) / times.idle) *
        10000
      ) / 100
    }%`;
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry,
  ): void {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName(this.name)
          .setNameLocalizations(this.nameLocalizations)
          .setDescription(this.description)
          .setDescriptionLocalizations(this.descriptionLocalizations),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        // guildIds: [`933262986720706600`, `740965554713657414`],
        // idHints: [`994423768481017957`]
      },
    );
  }

  public override async chatInputRun(
    interaction: ChatInputCommand.Interaction,
  ): Promise<void> {
    const embed = this.generateEmbed(interaction.locale);

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  }

  private generateEmbed(locale: `${Locale}`): EmbedBuilder {
    const stats = this.generalStatistics;

    const uptime = this.uptimeStatistics;

    const usage = this.usageStatistics;

    const titles = this.titles[locale];

    const fields = this.fields[locale];

    return new EmbedBuilder() //
      .setColor(BrandingColors.Primary)
      .setFields(
        {
          name: titles.stats,
          value: fields.stats(stats),
        },
        {
          name: titles.uptime,
          value: fields.uptime(uptime),
        },
        {
          name: titles.serverUsage,
          value: fields.serverUsage(usage),
        },
      );
  }
}

interface Titles {
  readonly stats: string;
  readonly uptime: string;
  readonly serverUsage: string;
}

// type Fields = { [P in keyof Titles]: (locale: `${Locale}`) => Titles[P] }
interface Fields {
  stats(stats: GeneralStatistics): string;
  uptime(uptime: UptimeStatistics): string;
  serverUsage(serverUsage: UsageStatistics): string;
}

interface GeneralStatistics {
  readonly channels: number;
  readonly guilds: number;
  readonly nodeJs: string;
  readonly users: number;
  readonly version: string;
  readonly sapphireVersion: string;
}

interface UptimeStatistics {
  readonly client: string;
  readonly host: string;
  readonly total: string;
}

interface UsageStatistics {
  readonly cpuLoad: string;
  readonly ramTotal: string;
  readonly ramUsed: string;
}
