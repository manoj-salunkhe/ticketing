import { Publisher,Subjects,ExpirationComleteEvent } from "@msticketings/common";

export class ExprationCompletePublisher extends Publisher<ExpirationComleteEvent>{
    readonly subject= Subjects.ExpirationComlete;    
}