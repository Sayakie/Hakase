import { ApplyOptions as Mixin } from "@sapphire/decorators";
import type { StoreRegistryValue } from "@sapphire/framework";
import { Events, Listener } from "@sapphire/framework";
import { blue, blueBright, gray } from "colorette";
import type { Client } from "discord.js";

import { ListenerIdentifiers } from "#lib/utils/Identifiers.js";

@Mixin<Listener.Options>({
  event: Events.ClientReady,
  name: ListenerIdentifiers.Ready,
  once: true,
})
export class HakaseListener extends Listener<typeof Events.ClientReady> {
  public override async run(client: Client<true>): Promise<void> {
    const { username, id } = client.user;

    this.container.logger.info(
      `Logged in as ${blueBright(`${username} (${id})`)}`,
    );
    this.printStoreInfomation();
  }

  private printStoreInfomation(): void {
    const { client, logger } = this.container;

    for (const store of client.stores.values()) {
      logger.info(this.styleStore(store, store === client.stores.last()));
    }
  }

  private styleStore(store: StoreRegistryValue, last: boolean): string {
    return gray(
      `${last ? "└─" : "├─"} Loaded ${blue(
        store.size.toString().padStart(3, " "),
      )} ${store.name}.`,
    );
  }
}
