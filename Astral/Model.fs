module Models

open Suave
open Suave.Json
open System.Runtime.Serialization
open System.IO

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
    [<field: DataMember(Name="color")>]
    Color:string; 
}

[<DataContract(Name = "root")>]
type Message = {
    [<field: DataMember(Name="text")>]
    Text:string
}

[<DataContract(Name = "root")>]
type Discussion = {
    [<field: DataMember(Name="messages")>]
    Messages: array<Message>
}

[<DataContract(Name = "root")>]
type AstralObject ={
    [<field: DataMember(Name="id")>]
    Id:int

    [<field: DataMember(Name="name")>]
    Name:string

    [<field: DataMember(Name="description")>]
    Description:string

    [<field: DataMember(Name="lecture")>]
    Lecture:string

    [<field: DataMember(Name="discussion")>]
    Discussion:Discussion

    [<field: DataMember(Name="position")>]
    Position:Point

    [<field: DataMember(Name="r")>]
    Radius:double

    [<field: DataMember(Name="rotV")>]
    RotationVelocity:double

    //TODO: Option<OrbitParameters>
    [<field: DataMember(Name="orbit")>]
    Orbit: OrbitParameters

    [<field: DataMember(Name="isLightSource")>]
    IsLightSource: bool

    [<field: DataMember(Name="texture")>]
    Texture:string
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

let private SunDiscussion = {
    Messages = [| 
                { Text = "Message 1" }
                { Text = "Message 2" }
                { Text = "Message 3" }
                |]
}



let private Sun = {
    Id = 1
    Name="Солнце"
    Lecture = "/client/lectures/sun_lecture.html"
    Description = "/client/descriptions/sun_desc.html"
    Discussion = SunDiscussion;
    Position = { x=00.0; y=0.0; z=0.0; }
    Radius = 20.0
    Orbit = { 
            Center = { x=0.0; y=0.0; z=0.0; }
            AngleVelocity = 0.0
            Color = "#DEF266"
        }
    RotationVelocity = 0.0
    IsLightSource = true
    Texture = "/client/pictures/sun_texture.jpg"
}

    
    
let private Mercury = {
    Id = 2;
    Name="Меркурий";
    Lecture = "/client/lectures/mercury_lecture.html";
    Description = "/client/descriptions/mercury_desc.html"
    Discussion = SunDiscussion;
    Position = { x=100.0; y=0.0; z=0.0; };
    Radius = 7.0;
    Orbit = { 
            Center = Sun.Position;
            AngleVelocity = 0.005;
            Color = "#ff00ff"
        };
    RotationVelocity = 0.003;
    IsLightSource = false;
    Texture = "/client/pictures/mercury_texture.jpg";
}

let private Venus = {
    Id = 3;
    Name="Венера";
    Lecture = "/client/lectures/venus_lecture.html";
    Description = "/client/descriptions/venus_desc.html"
    Discussion = SunDiscussion;
    Position = { x=130.0; y=0.0; z=0.0; };
    Radius = 7.0;    
    Orbit = { 
            Center = Sun.Position;
            AngleVelocity = 0.004;
            Color = "#FEF266"
        };
    RotationVelocity = 0.003;
    IsLightSource = false;
    Texture = "/client/pictures/venus_texture.jpg";
}
  

let private Earth = {
    Id = 4;
    Name="Земля";
    Lecture = "/client/lectures/earth_lecture.html";
    Description = "/client/descriptions/earth_desc.html"
    Discussion = SunDiscussion;
    Position = { x=160.0; y=0.0; z=0.0; };
    Radius = 7.0;    
    Orbit = { 
            Center = Sun.Position;
            AngleVelocity = 0.0035;
            Color = "#DEF266"
        };
    RotationVelocity = 0.0015;
    IsLightSource = false;
    Texture = "/client/pictures/earth_texture.jpg";
}

let private Mars = {
    Id = 5;
    Name="Марс";    
    Lecture = "/client/lectures/mars_lecture.html";
    Description = "/client/descriptions/mars_desc.html"
    Discussion = SunDiscussion;
    Position = { x=190.0; y=0.0; z=0.0; };
    Radius = 7.0;
    Orbit = { 
            Center = Sun.Position;
            AngleVelocity = 0.003;
            Color = "#f0f0f0"
        };
    RotationVelocity = 0.015;
    IsLightSource = false;
    Texture = "/client/pictures/mars_texture.jpg";
}

let private Jupiter = {
    Id = 6;
    Name="Юпитер";    
    Lecture = "/client/lectures/jupiter_lecture.html";
    Description = "/client/descriptions/jupiter_desc.html"
    Discussion = SunDiscussion;
    Position = { x=220.0; y=0.0; z=0.0; };
    Radius = 7.0;
    Orbit = { 
            Center = Sun.Position;
            AngleVelocity = 0.0025;
            Color = "#FFF266"
        };
    RotationVelocity = 0.015;
    IsLightSource = false;
    Texture = "/client/pictures/jupiter_texture.jpg";
}

let private Saturn = {
    Id = 7;
    Name="Сатурн";    
    Lecture = "Saturn lect";
    Description = "/client/descriptions/saturn_desc.html"
    Discussion = SunDiscussion;
    Position = { x=250.0; y=0.0; z=0.0; };
    Radius = 7.0;
    Orbit = { 
            Center = Sun.Position;
            AngleVelocity = 0.0020;
            Color = "#FFF266"
        };
    RotationVelocity = 0.015;
    IsLightSource = false;
    Texture = "/client/pictures/saturn_texture.jpg";
}

let private Uranus = {
    Id =8;
    Name="Уран";    
    Lecture = "/client/lectures/uranus_lecture.html";
    Description = "/client/descriptions/uranus_desc.html"
    Discussion = SunDiscussion;
    Position = { x=280.0; y=0.0; z=0.0; };
    Radius = 7.0;
    Orbit = { 
            Center = Sun.Position;
            AngleVelocity = 0.0015;
            Color = "#DEF266"
        };
    RotationVelocity = 0.015;
    IsLightSource = false;
    Texture = "/client/pictures/uranus_texture.jpg";
}

let private Neptune = {
    Id = 9;
    Name="Нептун";    
    Lecture = "/client/lectures/neptune_lecture.html";
    Description = "/client/descriptions/neptune_desc.html"
    Discussion = SunDiscussion;
    Position = { x=310.0; y=0.0; z=0.0; };
    Radius = 7.0;
    Orbit = { 
            Center = Sun.Position;
            AngleVelocity = 0.001;
            Color = "#DEF266"
        };
    RotationVelocity = 0.015;
    IsLightSource = false;
    Texture = "/client/pictures/neptune_texture.jpg";
}


let private Pluto = {
    Id = 10;
    Name="Плутон";    
    Lecture = "/client/lectures/pluto_lecture.html";
    Description = "/client/descriptions/pluto_desc.html"
    Discussion = SunDiscussion;
    Position = { x=340.0; y=0.0; z=0.0; };
    Radius = 7.0;
    Orbit = { 
            Center = Sun.Position;
            AngleVelocity = 0.0005;
            Color = "#DEF266"
        };
    RotationVelocity = 0.015;
    IsLightSource = false;
    Texture = "/client/pictures/pluto_texture.jpg";
}

let SolarSystem = {
    Id = 1;
    Name="Солнечная Система";
    Description = "Гелиоцентрическая модель планет"
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
                Color = "#DEF266"
            };
        RotationVelocity = 0.0;
    }


let private PtolemeyMoon = {
    Id = 12;
    Name="Луна";    
    Lecture = "/client/lectures/moon_lecture.html";
    Description = "/client/descriptions/sun_desc.html"
    Discussion = SunDiscussion;
    Position = { x=100.0; y=0.0; z=0.0; };
    Radius = 7.0;
    Orbit = { 
            Center = PtolemeyEarth.Position;
            AngleVelocity = 0.0005;
            Color = "#DEF266"
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
                Color = "#DEF266"
            };
        RotationVelocity = 0.0;
    }

let private PtolemeyVenus = { 
    Venus with
        Id = 14
        Position = { x=200.0; y=0.0; z=0.0; }
        Orbit = { 
                Center = PtolemeyEarth.Position
                AngleVelocity = 0.00035
                Color = "#DEF266"
            }
        RotationVelocity = 0.0
    }

let private PtolemeySun = { 
    Sun with 
        Id = 15
        Position = { x=400.0; y=0.0; z=0.0; }
        Orbit = { 
                Center = { x=0.0; y=0.0; z=0.0; }
                AngleVelocity = 0.0004
                Color = "#DEF266"
            }
    }

let private PtolemeyMars = { 
    Mars with
        Id = 16
        Position = { x=600.0; y=0.0; z=0.0; }
        Orbit = { 
                Center = PtolemeyEarth.Position
                AngleVelocity = 0.00025
                Color = "#DEF266"
            }
        RotationVelocity = 0.0
    }

let private PtolemeyJupiter = { 
    Jupiter with
        Id = 17
        Position = { x=650.0; y=0.0; z=0.0; };
        Orbit = { 
                Center = PtolemeyEarth.Position
                AngleVelocity = 0.0002
                Color = "#DEF266"
            }
        RotationVelocity = 0.0
    }

let private PtolemeySaturn = { 
    Saturn with
        Id = 18
        Position = { x=700.0; y=0.0; z=0.0; }
        Orbit = { 
                Center = PtolemeyEarth.Position
                AngleVelocity = 0.00015
                Color = "#DEF266"
            }
        RotationVelocity = 0.0
    }


let PtolemeySystem = {
    Id = 2;
    Name="Птолемеева Система"
    Description = "Геоцентрическая модель расположения планет"
    ElementsIds = [| 11..18 |]
    Picture = "/client/pictures/ptolemey_system.jpg"
}

let RubinSun = {
    Sun with 
        Id = 30
        Name = "Рубин"
        Lecture = "/client/lectures/rubin_lecture.html"
        Texture = "/client/pictures/rubin_texture.jpg"
    }

let RubinSystem = {
    Id = 3;
    Name="Система Рубина";
    Description = "Что если бы на небе вместо Солнца светил Рубин?"
    ElementsIds = Array.concat [ [| 2..10 |]; [| 30 |] ]
    Picture = "/client/pictures/rubin_system.jpg";
} 

let TwinStarA = {
    Id = 50
    Name="Звезда А"
    Lecture = "/client/lectures/twinstara_lecture.html"
    Description = "/client/descriptions/twinstara_desc.html"
    Discussion = SunDiscussion;
    Position = { x=100.0; y=0.0; z=0.0; }
    Radius = 30.0
    Orbit = { 
            Center = { x=0.0; y=0.0; z=0.0; }
            AngleVelocity = 0.01
            Color = "#0040ff"
        }
    RotationVelocity = 0.075
    IsLightSource = true
    Texture = "/client/pictures/bluedwarf_texture.jpg"
}

let TwinStarB = {
    TwinStarA with 
        Id = 51
        Name="Звезда B"
        Lecture = "/client/lectures/twinstarb_lecture.html"
        Description = "/client/descriptions/twinstarb_desc.html"
        Position = { x=(-100.0); y=0.0; z=0.0; }
}

let TwinStarsSystem = {
    Id = 4;
    Name="Двойные звезды";
    Description = "Пример двух двойных звезд"
    ElementsIds = [| 50; 51 |]
    Picture = "/client/pictures/twin_system.jpg";
}

let AlphaCentauriA = {
    Id = 60
    Name="Альфа Центавра А"
    Lecture = "/client/lectures/alphacentauria_lecture.html"
    Description = "/client/descriptions/alphacentauria_desc.html"
    Discussion = SunDiscussion;
    Position = { x=(-700.0); y=0.0; z=0.0; }
    Radius = 30.0
    Orbit = { 
            Center = { x=(0.0); y=0.0; z=0.0; }
            AngleVelocity = 0.001
            Color = "#0040ff"
        }
    RotationVelocity = 0.0
    IsLightSource = true
    Texture = "/client/pictures/sun_texture.jpg"
}

let AlphaCentauriB = {
    Id = 61
    Name="Альфа Центавра B"
    Lecture = "/client/lectures/alphacentaurib_lecture.html"
    Description = "/client/descriptions/alphacentaurib_desc.html"
    Discussion = SunDiscussion;
    Position = { x=1400.0; y=0.0; z=0.0; }
    Radius = 20.0
    Orbit = { 
            Center = { x=(700.0); y=0.0; z=0.0; }
            AngleVelocity = 0.005
            Color = "#0040ff"
        }
    RotationVelocity = 0.0
    IsLightSource = true
    Texture = "/client/pictures/sun_texture.jpg"
}

let ProximaCentauri = {
    Id = 62
    Name="Проксима Центавра"
    Lecture = "/client/lectures/proximacentauri_lecture.html"
    Description = "/client/descriptions/proximacentauri_desc.html"
    Discussion = SunDiscussion;
    Position = { x=500.0; y=0.0; z=0.0; }
    Radius = 8.0
    Orbit = { 
            Center = { x=(350.0); y=0.0; z=(700.0); }
            AngleVelocity = 0.003
            Color = "#0040ff"
        }
    RotationVelocity = 0.00
    IsLightSource = true
    Texture = "/client/pictures/reddwarf_texture.jpg"
}


let AlphaCentauriSystem = {
    Id = 5;
    Name="Альфа Центара";
    Description = "Система Альфа Центара"
    ElementsIds = [| 60..62 |]
    Picture = "/client/pictures/alphacentauri_system.jpg";
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

        //RubinSun;

        TwinStarA;
        TwinStarB;

        AlphaCentauriA;
        AlphaCentauriB;
        ProximaCentauri;

        |]
    static member AstralSystems = [| 
        SolarSystem; 
        PtolemeySystem;        
        TwinStarsSystem;
        AlphaCentauriSystem;
        //RubinSystem;
        |]

    static member findObject (id:int) = 
        Seq.tryFind (fun (e:AstralObject) -> e.Id = id) DB.AstralObjects

    static member findSystem (id:int) = 
        Seq.tryFind (fun (e:AstralSystem) -> e.Id = id) DB.AstralSystems

    static member findObjectsByName (pattern:string) = 
        Seq.filter (fun (e:AstralObject) -> e.Name.ToLower().Contains(pattern.ToLower())) DB.AstralObjects

    static member findSystemsContainingObject (id:int) = 
        Seq.filter (fun (s:AstralSystem) -> Array.exists ((=) id) s.ElementsIds) DB.AstralSystems
