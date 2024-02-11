import { ApplyOptions as Mixin } from "@sapphire/decorators";
import type { StoreRegistryValue } from "@sapphire/framework";
import { Events, Listener } from "@sapphire/framework";
import { createBanner } from "@skyra/start-banner";
import {
  blue,
  blueBright,
  gray,
  green,
  magenta,
  magentaBright,
  white,
  yellow,
} from "colorette";
import type { Client } from "discord.js";
import figlet from "figlet";
import gradient from "gradient-string";
import { env } from "#lib/env.js";
import { ListenerIdentifiers } from "#lib/utils/Identifiers.js";

@Mixin<Listener.Options>({
  event: Events.ClientReady,
  name: ListenerIdentifiers.Ready,
  once: true,
})
export class HakaseListener extends Listener<typeof Events.ClientReady> {
  private readonly style = this.isDev ? yellow : blue;

  public override async run(client: Client<true>): Promise<void> {
    const { username: _username, id: _id } = client.user;
    const [username, id] = [_username, _id].map(blueBright);

    this.container.logger.info(`Logged in as ${`${username} (${id})`}`);
    this.printBanner();
    this.printStoreInfomation();
  }

  private get isDev(): boolean {
    return env.NODE_ENV === "development";
  }

  private printBanner(): void {
    const success = green("+");

    const llc = this.isDev ? magentaBright : white;
    const blc = this.isDev ? magenta : blue;

    this.container.logger.info(
      createBanner({
        name: [gradient.pastel.multiline(figlet.textSync("Hakase"))],
        extra: [
          `[${success}] Gateway`,
          this.isDev
            ? ` ${blc("<")}${llc("/")}${blc(">")} ${llc("DEVELOPMENT MODE")}`
            : "",
        ],
      }),
    );
  }

  private printStoreInfomation(): void {
    const stores = [...this.container.client.stores.values()];
    const last = stores.pop();

    for (const store of stores) {
      this.container.client.logger.info(this.styleStore(store, false));
    }
    last && this.container.client.logger.info(this.styleStore(last, true));
  }

  private styleStore(store: StoreRegistryValue, last: boolean): string {
    const size = store.size.toString().padStart(3, " ");
    return gray(
      `${last ? "└─" : "├─"} Loaded ${this.style(size)} ${store.name}.`,
    );
  }
}
