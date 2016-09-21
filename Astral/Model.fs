module Models

open Suave
open Suave.Json
open System.Runtime.Serialization

[<DataContract(Name = "root")>]
type Point = {
    [<field: DataMember(Name="x")>]
    x:double;
    [<field: DataMember(Name="y")>]
    y:double; 
    [<field: DataMember(Name="z")>]
    z:double; 
}

[<DataContract(Name = "root")>]
type AstralObject(name:string) = 
    
    [<field: DataMember(Name="id")>]
    member val Id = -1 with get, set

    [<field: DataMember(Name="name")>]
    member val Name = name with get, set

    [<field: DataMember(Name="lecture")>]
    member val Lecture = "Empty" with get, set

    [<field: DataMember(Name="position")>]
    member val Position = { x=0.0; y=0.0; z=0.0; } with get, set

    [<field: DataMember(Name="r")>]
    member val Radius = 0.0 with get, set

    [<field: DataMember(Name="rotV")>]
    member val RotationVelocity = 0.0 with get, set

    [<field: DataMember(Name="texture")>]
    member val Texture = "" with get, set

[<DataContract(Name = "root")>]
type AstralSystem(name:string) = 
    
    [<field: DataMember(Name="id")>]
    member val Id = -1 with get, set

    [<field: DataMember(Name="name")>]
    member val Name = name with get, set

    [<field: DataMember(Name="elements")>]
    member val ElementsIds:array<int> = [| |] with get,set

    [<field: DataMember(Name="picture")>]
    member val Picture = "" with get, set

    

let private Earth = new AstralObject("Earth")
Earth.Id <- 1
Earth.Lecture <- "Earth is our home" 
Earth.Position <- { x=(-30.0); y=0.0; z=0.0; }
Earth.Radius <- 10.0
Earth.RotationVelocity <- 0.003
Earth.Texture <- "/client/pictures/earth_texture.jpg"

let private Pluto = new AstralObject("Pluto")
Pluto.Id <- 2
Pluto.Lecture <- "Pluto is merely a planet"
Pluto.Position <- { x=35.0; y=0.0; z=30.0; }
Pluto.Radius <- 3.0
Pluto.RotationVelocity <- 0.015
Pluto.Texture <- "/client/pictures/pluto_texture.jpg"

let private Jupiter = new AstralObject("Jupiter")
Jupiter.Id <- 3
Jupiter.Lecture <- "Jupiter is the biggest Solar System planet"
Jupiter.Position <- { x=0.0; y=0.0; z=(-70.0); }
Jupiter.Radius <- 20.0
Jupiter.RotationVelocity <- 0.015
Jupiter.Texture <- "/client/pictures/jupiter_texture.jpg"


let SolarSystem = new AstralSystem("Solar System")
SolarSystem.ElementsIds <- [| 1; 2; 3 |]
SolarSystem.Id <- 1
SolarSystem.Picture <- "/client/pictures/solar_system.jpg"

type DB = 
    static member AstralObjects = [| Earth; Pluto; Jupiter |]
    static member AstralSystems = [| SolarSystem |]

    static member findObject (id:int) = 
        Seq.tryFind (fun (e:AstralObject) -> e.Id = id) DB.AstralObjects

    static member findSystem (id:int) = 
        Seq.tryFind (fun (e:AstralSystem) -> e.Id = id) DB.AstralSystems
