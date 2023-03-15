export class MarkerModel {
  private id: string;
  private username: string;
  private latitude: string;
  private longitude: string;

  constructor(id: string, username: string, latitude: string, longitude:string) {
    this.id = id;
    this.username = username;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  getID(): string {
    return this.id;
  }

  getUsername(): string {
    return this.username;
  }

  getLatitude(): string {
    return this.latitude;
  }

  getLongitude(): string {
    return this.longitude;
  }

  setID(newID: string) {
    this.id = newID;
  }

  setUsername(newUsername: string) {
    this.username = newUsername;
  }

  setLatitude(newLatitude: string) {
    this.latitude = newLatitude;
  }

  setLongitude(newLongitude: string) {
    this.longitude = newLongitude;
  }
}
