import { validateOrReject } from "class-validator";
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";

@EventSubscriber()
export class Subscriber implements EntitySubscriberInterface<any> {
  async beforeInsert(event: InsertEvent<any>) {
    await validateOrReject(event.entity)
  }

  async beforeUpdate(event: UpdateEvent<any>) {
    if(event.entity) await validateOrReject(event.entity)
  }
}