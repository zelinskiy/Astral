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
type AstralObject ={
    [<field: DataMember(Name="id")>]
    Id:int;

    [<field: DataMember(Name="name")>]
    Name:string;

    [<field: DataMember(Name="lecture")>]
    Lecture:string;

    [<field: DataMember(Name="position")>]
    Position:Point;

    [<field: DataMember(Name="r")>]
    Radius:double;

    [<field: DataMember(Name="rotV")>]
    RotationVelocity:double;

    [<field: DataMember(Name="texture")>]
    Texture:string;
} 
    
    

[<DataContract(Name = "root")>]
type AstralSystem = {
    [<field: DataMember(Name="id")>]
    Id:int;

    [<field: DataMember(Name="name")>]
    Name:string;

    [<field: DataMember(Name="elements")>]
    ElementsIds:array<int>;

    [<field: DataMember(Name="picture")>]
    Picture:string;
}
    
    

    

let private Earth = {
    Id = 1;
    Name="Earth";
    Lecture = "Earth is our home";
    Position = { x=(-30.0); y=0.0; z=0.0; };
    Radius = 10.0;
    RotationVelocity = 0.003;
    Texture = "/client/pictures/earth_texture.jpg";
}

let private Pluto = {
    Id = 2;
    Name="Pluto";    
    Lecture = "Pluto is merely a planet";
    Position = { x=35.0; y=0.0; z=30.0; };
    Radius = 3.0;
    RotationVelocity = 0.015;
    Texture = "/client/pictures/pluto_texture.jpg";
}




let SolarSystem = {
    Name="Solar System";
    ElementsIds = [| 1; 2 |];
    Id = 1;
    Picture = "/client/pictures/solar_system.jpg";
}

type DB = 
    static member AstralObjects = [| Earth; Pluto |]
    static member AstralSystems = [| SolarSystem |]

    static member findObject (id:int) = 
        Seq.tryFind (fun (e:AstralObject) -> e.Id = id) DB.AstralObjects

    static member findSystem (id:int) = 
        Seq.tryFind (fun (e:AstralSystem) -> e.Id = id) DB.AstralSystems
