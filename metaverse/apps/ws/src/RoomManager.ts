import type { User } from "./User";
import { OutgoingMessage } from "./types";

export class RoomManager {
    rooms : Map<String,User[]>;
    static instance : RoomManager;
    private constructor(){
        this.rooms = new Map();
    }
    static getInstance(){
        if (!this.instance){
            this.instance = new RoomManager();
        }
        return this.instance;
    }
    public addUser(spaceId:string,user:User){
        if(!this.rooms.has(spaceId)){
            this.rooms.set(spaceId,[user])
            return;
        }
        this.rooms.set(spaceId,[...(this.rooms.get(spaceId) ?? []), user])
        return;
    }
    public removeUser(spaceId : string, user : User){
        if (!this.rooms.has(spaceId)) {
            return;
        }
        this.rooms.set(spaceId, (this.rooms.get(spaceId)?.filter((u) => u.id !== user.id) ?? []));
    }
    public broadcast(message : OutgoingMessage, user : User, roomId : string){
        if(!this.rooms.has(roomId)){
            return;
        }
        this.rooms.get(roomId)?.forEach(u => {
            if(u.id !== user.id){
                u.send(message);
            }
        });
    }
}