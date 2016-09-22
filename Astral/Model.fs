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
type OrbitParameters = {
    [<field: DataMember(Name="center")>]
    Center:Point;
    [<field: DataMember(Name="rotAngle")>]
    RotationAngle:double; 
    [<field: DataMember(Name="angleV")>]
    AngleVelocity:double; 
    [<field: DataMember(Name="r")>]
    Radius:double; 
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

    [<field: DataMember(Name="orbit")>]
    Orbit: OrbitParameters;

    [<field: DataMember(Name="isLightSource")>]
    IsLightSource: bool;

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
    Position = { x=(-50.0); y=0.0; z=0.0; };
    Radius = 10.0;
    RotationVelocity = 0.003;
    Orbit = { 
            Center = { x=0.0; y=0.0; z=0.0; };
            RotationAngle = 0.0;
            AngleVelocity = 0.01;
            Radius = 40.0;
        };
    IsLightSource = false;
    Texture = "/client/pictures/earth_texture.jpg";
}

let private Pluto = {
    Id = 2;
    Name="Pluto";    
    Lecture = "Pluto is merely a planet";
    Position = { x=100.0; y=0.0; z=0.0; };
    Radius = 3.0;
    Orbit = { 
            Center = { x=0.0; y=0.0; z=0.0; };
            RotationAngle = 0.0;
            AngleVelocity = 0.0;
            Radius = 0.0;
        };
    RotationVelocity = 0.015;
    IsLightSource = false;
    Texture = "/client/pictures/pluto_texture.jpg";
}

let private Sun = {
    Id = 3;
    Name="Sun";    
    Lecture = "Sun is a star";
    Position = { x=0.0; y=0.0; z=0.0; };
    Radius = 20.0;
    Orbit = { 
            Center = { x=0.0; y=0.0; z=0.0; };
            RotationAngle = 0.0;
            AngleVelocity = 0.0;
            Radius = 0.0;
        };
    RotationVelocity = 0.0;
    IsLightSource = true;
    Texture = "/client/pictures/sun_texture.jpg";
}



let SolarSystem = {
    Name="Solar System";
    ElementsIds = [| 1; 2; 3 |];
    Id = 1;
    Picture = "/client/pictures/solar_system.jpg";
}

type DB = 
    static member AstralObjects = [| Earth; Pluto; Sun |]
    static member AstralSystems = [| SolarSystem |]

    static member findObject (id:int) = 
        Seq.tryFind (fun (e:AstralObject) -> e.Id = id) DB.AstralObjects

    static member findSystem (id:int) = 
        Seq.tryFind (fun (e:AstralSystem) -> e.Id = id) DB.AstralSystems
