import * as L from 'leaflet';

declare module 'leaflet' {
namespace Routing {
  interface RoutingControlOptions {
    waypoints: L.LatLng[];
    router?: any;
    lineOptions?: {
      styles?: any[];
      extendToWaypoints?: boolean;
      missingRouteTolerance?: number;
    };
    show?: boolean;
    showAlternatives?: boolean;
    fitSelectedRoutes?: boolean;
    routeWhileDragging?: boolean;
    addWaypoints?: boolean;
    draggableWaypoints?: boolean;
    routeLine?: (route: any, options: any) => L.Layer;
    autoRoute?: boolean;
    createMarker?: (i: number, waypoint: any, n: number) => L.Marker;
    plan?: any;
    useZoomParameter?: boolean;
    containerClassName?: string;
  }

  class Control extends L.Control {
    constructor(options: RoutingControlOptions);
    getRouter(): any;
    getWaypoints(): any[];
    setWaypoints(waypoints: L.LatLng[]): this;
    spliceWaypoints(index: number, waypointsToRemove: number, ...waypoints: L.LatLng[]): this;
    getPlan(): any;
    getRouter(): any;
    route(): void;
    on(type: string, fn: any, context?: any): this;
  }

  function control(options: RoutingControlOptions): Control;
}
}