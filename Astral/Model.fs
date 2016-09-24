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
    [<field: DataMember(Name="angleV")>]
    AngleVelocity:double; 
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

    //TODO: Option<OrbitParameters>
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

    [<field: DataMember(Name="description")>]
    Description:string;

    [<field: DataMember(Name="elements")>]
    ElementsIds:array<int>;

    [<field: DataMember(Name="picture")>]
    Picture:string;
}

let private Sun = {
    Id = 1;
    Name="Sun";    
    Lecture = "Sun is a star";
    Position = { x=00.0; y=0.0; z=0.0; };
    Radius = 20.0;
    Orbit = { 
            Center = { x=0.0; y=0.0; z=0.0; };
            AngleVelocity = 0.0;
        };
    RotationVelocity = 0.0;
    IsLightSource = true;
    Texture = "/client/pictures/sun_texture.jpg";
}

    
    
let private Mercury = {
    Id = 2;
    Name="Mercury";
    Lecture = "Mercury lect";
    Position = { x=100.0; y=0.0; z=0.0; };
    Radius = 7.0;
    Orbit = { 
            Center = Sun.Position;
            AngleVelocity = 0.005;
        };
    RotationVelocity = 0.003;
    IsLightSource = false;
    Texture = "/client/pictures/mercury_texture.jpg";
}

let private Venus = {
    Id = 3;
    Name="Venus";
    Lecture = "Venus lect";
    Position = { x=130.0; y=0.0; z=0.0; };
    Radius = 7.0;    
    Orbit = { 
            Center = Sun.Position;
            AngleVelocity = 0.004;
        };
    RotationVelocity = 0.003;
    IsLightSource = false;
    Texture = "/client/pictures/venus_texture.jpg";
}
  

let private Earth = {
    Id = 4;
    Name="Earth";
    Lecture = "Earth is our home";
    Position = { x=160.0; y=0.0; z=0.0; };
    Radius = 7.0;    
    Orbit = { 
            Center = Sun.Position;
            AngleVelocity = 0.0035;
        };
    RotationVelocity = 0.0015;
    IsLightSource = false;
    Texture = "/client/pictures/earth_texture.jpg";
}

let private Mars = {
    Id = 5;
    Name="Mars";    
    Lecture = "Mars is a warrior";
    Position = { x=190.0; y=0.0; z=0.0; };
    Radius = 7.0;
    Orbit = { 
            Center = Sun.Position;
            AngleVelocity = 0.003;
        };
    RotationVelocity = 0.015;
    IsLightSource = false;
    Texture = "/client/pictures/mars_texture.jpg";
}

let private Jupiter = {
    Id = 6;
    Name="Jupiter";    
    Lecture = "Jupiter is a wizard";
    Position = { x=220.0; y=0.0; z=0.0; };
    Radius = 7.0;
    Orbit = { 
            Center = Sun.Position;
            AngleVelocity = 0.0025;
        };
    RotationVelocity = 0.015;
    IsLightSource = false;
    Texture = "/client/pictures/jupiter_texture.jpg";
}

let private Saturn = {
    Id = 7;
    Name="Saturn";    
    Lecture = "Saturn lect";
    Position = { x=250.0; y=0.0; z=0.0; };
    Radius = 7.0;
    Orbit = { 
            Center = Sun.Position;
            AngleVelocity = 0.0020;
        };
    RotationVelocity = 0.015;
    IsLightSource = false;
    Texture = "/client/pictures/saturn_texture.jpg";
}

let private Uranus = {
    Id =8;
    Name="Uranus";    
    Lecture = "Uranus lect";
    Position = { x=280.0; y=0.0; z=0.0; };
    Radius = 7.0;
    Orbit = { 
            Center = Sun.Position;
            AngleVelocity = 0.0015;
        };
    RotationVelocity = 0.015;
    IsLightSource = false;
    Texture = "/client/pictures/uranus_texture.jpg";
}

let private Neptune = {
    Id = 9;
    Name="Neptune";    
    Lecture = "Neptune lect";
    Position = { x=310.0; y=0.0; z=0.0; };
    Radius = 7.0;
    Orbit = { 
            Center = Sun.Position;
            AngleVelocity = 0.001;
        };
    RotationVelocity = 0.015;
    IsLightSource = false;
    Texture = "/client/pictures/neptune_texture.jpg";
}


let private Pluto = {
    Id = 10;
    Name="Pluto";    
    Lecture = "Pluto is merely a planet";
    Position = { x=340.0; y=0.0; z=0.0; };
    Radius = 7.0;
    Orbit = { 
            Center = Sun.Position;
            AngleVelocity = 0.0005;
        };
    RotationVelocity = 0.015;
    IsLightSource = false;
    Texture = "/client/pictures/pluto_texture.jpg";
}

let SolarSystem = {
    Id = 1;
    Name="Solar System";
    Description = "Only planets"
    ElementsIds = [| 1..10 |];
    Picture = "/client/pictures/solar_system.jpg";
}





let private PtolemeyEarth = { 
    Earth with
        Id = 11;
        Position = { x=0.0; y=0.0; z=0.0; };
        Orbit = { 
                Center = { x=0.0; y=0.0; z=0.0; }
                AngleVelocity = 0.0;
            };
        RotationVelocity = 0.0;
    }


let private PtolemeyMoon = {
    Id = 12;
    Name="Moon";    
    Lecture = "Moon is our neariest neighbour";
    Position = { x=100.0; y=0.0; z=0.0; };
    Radius = 7.0;
    Orbit = { 
            Center = PtolemeyEarth.Position;
            AngleVelocity = 0.0005;
        };
    RotationVelocity = 0.0;
    IsLightSource = false;
    Texture = "/client/pictures/moon_texture.jpg";
}

let private PtolemeyMercury = { 
    Mercury with
        Id = 13;
        Position = { x=150.0; y=0.0; z=0.0; };
        Orbit = { 
                Center = PtolemeyEarth.Position;
                AngleVelocity = 0.0003;
            };
        RotationVelocity = 0.0;
    }

let private PtolemeyVenus = { 
    Venus with
        Id = 14;
        Position = { x=200.0; y=0.0; z=0.0; };
        Orbit = { 
                Center = PtolemeyEarth.Position;
                AngleVelocity = 0.00035;
            };
        RotationVelocity = 0.0;
    }

let private PtolemeySun = { 
    Sun with 
        Id = 15;
        Position = { x=250.0; y=0.0; z=0.0; };
        Orbit = { 
                Center = { x=0.0; y=0.0; z=0.0; };
                AngleVelocity = 0.0004;
            };
    }

let private PtolemeyMars = { 
    Mars with
        Id = 16;
        Position = { x=300.0; y=0.0; z=0.0; };
        Orbit = { 
                Center = PtolemeyEarth.Position;
                AngleVelocity = 0.00025;
            };
        RotationVelocity = 0.0;
    }

let private PtolemeyJupiter = { 
    Jupiter with
        Id = 17;
        Position = { x=350.0; y=0.0; z=0.0; };
        Orbit = { 
                Center = PtolemeyEarth.Position;
                AngleVelocity = 0.0002;
            };
        RotationVelocity = 0.0;
    }

let private PtolemeySaturn = { 
    Saturn with
        Id = 18;
        Position = { x=400.0; y=0.0; z=0.0; };
        Orbit = { 
                Center = PtolemeyEarth.Position;
                AngleVelocity = 0.00015;
            };
        RotationVelocity = 0.0;
    }


let PtolemeySystem = {
    Id = 2;
    Name="Ptolemey System";
    Description = "Only planets in geocentryc order"
    ElementsIds = [| 11..18 |];
    Picture = "/client/pictures/ptolemey_system.jpg";
}

let RubinSun = {
    Sun with 
        Id = 30;
        Name = "Rubin";
        Lecture = "Rubin is our star"
        Texture = "/client/pictures/rubin_texture.jpg"
    }

let RubinSystem = {
    Id = 3;
    Name="Rubin System";
    Description = "What if Rubin was shining instead of the Sun?"
    ElementsIds = Array.concat [ [| 2..10 |]; [| 30 |] ]
    Picture = "/client/pictures/rubin_system.jpg";
} 

type DB = 
    static member AstralObjects = [| 
        Sun; 
        Mercury; 
        Venus; 
        Earth; 
        Mars; 
        Jupiter;
        Saturn;
        Uranus;
        Neptune;
        Pluto;

        PtolemeyEarth;
        PtolemeyMoon;
        PtolemeyMercury;
        PtolemeyVenus;        
        PtolemeySun;
        PtolemeyMars;
        PtolemeyJupiter;
        PtolemeySaturn;

        RubinSun;
        |]
    static member AstralSystems = [| 
        SolarSystem; 
        PtolemeySystem; 
        RubinSystem; 
        |]

    static member findObject (id:int) = 
        Seq.tryFind (fun (e:AstralObject) -> e.Id = id) DB.AstralObjects

    static member findSystem (id:int) = 
        Seq.tryFind (fun (e:AstralSystem) -> e.Id = id) DB.AstralSystems
