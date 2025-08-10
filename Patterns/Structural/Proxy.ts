/**
 * Proxy pattern — control access and add caching.
 *
 * Intent: Provide a surrogate or placeholder for another object to control
 * access to it.
 *
 * When to use:
 * - Lazy initialization, access control, caching, logging
 */

class GeoCoder {
  public getLatLng(address: string): string {
    if (address === "Amsterdam") return "52.3700° N, 4.8900° E";
    if (address === "London") return "51.5171° N, 0.1062° W";
    if (address === "Paris") return "48.8742° N, 2.3470° E";
    if (address === "Berlin") return "52.5233° N, 13.4127° E";
    return "";
  }
}

class GeoProxy {
  private readonly geocoder = new GeoCoder();
  private readonly geocache: Record<string, string> = {};

  public getLatLng(address: string): string {
    if (!this.geocache[address]) {
      this.geocache[address] = this.geocoder.getLatLng(address);
    }
    log.add(`${address}: ${this.geocache[address]}`);
    return this.geocache[address];
  }

  public getCount(): number {
    return Object.keys(this.geocache).length;
  }
}

const log = (() => {
  let buffer = "";
  return {
    add(msg: string) {
      buffer += msg + "\n";
    },
    show() {
      alert(buffer);
      buffer = "";
    },
  };
})();

const run = (): void => {
  const geo = new GeoProxy();
  geo.getLatLng("Paris");
  geo.getLatLng("London");
  geo.getLatLng("London");
  geo.getLatLng("London");
  geo.getLatLng("London");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("London");
  geo.getLatLng("London");
  log.add(`\nCache size: ${geo.getCount()}`);
  log.show();
};

run();


