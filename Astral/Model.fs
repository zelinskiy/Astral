module Models

open Suave
open Suave.Json
open System.Runtime.Serialization

type Point = { x:int; y:int; z:int; }

[<DataContract(Name = "root")>]
type AstralObject(name:string) = 
    
    [<field: DataMember(Name="id")>]
    member val Id = -1 with get, set

    [<field: DataMember(Name="name")>]
    member val Name = name with get, set

    [<field: DataMember(Name="lecture")>]
    member val Lecture = "Empty" with get, set

    [<field: DataMember(Name="position")>]
    member val Position = { x=0; y=0; z=0; } with get, set

    [<field: DataMember(Name="radius")>]
    member val Radius = 0 with get, set

    [<field: DataMember(Name="texture")>]
    member val Texture = "/client/pictures/earth_texture.jpg" with get, set

[<DataContract(Name = "root")>]
type AstralSystem(name:string) = 
    
    [<field: DataMember(Name="id")>]
    member val Id = -1 with get, set

    [<field: DataMember(Name="name")>]
    member val Name = name with get, set

    [<field: DataMember(Name="elements")>]
    member val ElementsIds:array<int> = [| |] with get,set

    

let private Earth = new AstralObject("Earth")
Earth.Id <- 1
Earth.Lecture <- "Earth is our home" 
Earth.Position <- { x=25; y=0; z=0; }
Earth.Radius <- 10
let private Pluto = new AstralObject("Pluto")
Pluto.Id <- 2
Pluto.Lecture <- "Pluto is merely a planet"
Earth.Position <- { x=0; y=0; z=0; }
Earth.Radius <- 2

let SolarSystem = new AstralSystem("Solar System")
SolarSystem.ElementsIds <- [| 1; 2 |]
SolarSystem.Id <- 1

type DB = 
    static member AstralObjects = [| Earth; Pluto |]
    static member AstralSystems = [| SolarSystem |]

    static member findObject (id:int) = 
        Seq.tryFind (fun (e:AstralObject) -> e.Id = id) DB.AstralObjects

    static member findSystem (id:int) = 
        Seq.tryFind (fun (e:AstralSystem) -> e.Id = id) DB.AstralSystems
