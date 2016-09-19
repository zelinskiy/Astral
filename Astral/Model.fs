module Models

open Suave
open Suave.Json
open System.Runtime.Serialization

[<DataContract(Name = "root")>]
type AstralObject(name:string) = 
    
    [<field: DataMember(Name="Id")>]
    member val Id = -1 with get, set

    [<field: DataMember(Name="Name")>]
    member val Name = name with get, set

    [<field: DataMember(Name="Lecture")>]
    member val Lecture = "Empty" with get, set

    //TODO: check if this.Id in list
    [<field: DataMember(Name="Elements")>]
    member val ElementsIds:Option<array<int>> = None with get,set
    


    

let private Earth = new AstralObject("Earth")
Earth.Id <- 1
Earth.Lecture <- "Earth is our home" 
let private Pluto = new AstralObject("Pluto")
Pluto.Id <- 2
Pluto.Lecture <- "Pluto is merely a planet"

let SolarSystem = new AstralObject("Solar System")
SolarSystem.ElementsIds <- Some([| 1; 2 |])
SolarSystem.Id <- 3

type DB = 
    static member AllObjects = [| SolarSystem; Earth; Pluto |]
    static member SuperObjects = [| SolarSystem |]

    static member findObject (id:int) = 
        Seq.tryFind (fun (e:AstralObject) -> e.Id = id) DB.AllObjects
