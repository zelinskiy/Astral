module Models

open Suave
open Suave.Json
open System.Runtime.Serialization

[<DataContract>]
type Customer = 
    { 
        [<field: DataMember(Name="Id")>]
        Id:int;

        [<field: DataMember(Name="Name")>]
        Name:string; 
    }

[<DataContract>]
type Commodity = 
    {
        [<field: DataMember(Name="Id")>]
        Id:int;

        [<field: DataMember(Name="Name")>]
        Name:string;

        [<field: DataMember(Name="Amount")>]
        Amount:int; 
    }

[<DataContract>]
type Order = 
    {
        [<field: DataMember(Name="Name")>]
        Id:int; 

        [<field: DataMember(Name="BuyerId")>]
        BuyerId:int; 

        [<field: DataMember(Name="Commodities")>]
        Commodities:array<Commodity> 
    }


let private John:Customer = { Id=1; Name="John" }
let private Ann:Customer = { Id=2; Name="Ann" }

let private Apple:Commodity = { Id=1; Name="Apple"; Amount=100 }
let private Banana:Commodity = { Id=2; Name="Banana"; Amount=200 }
let private Shit:Commodity = { Id=3; Name="Shit"; Amount=100 }

let private Order1:Order = { Id=1; BuyerId=1; Commodities = [| { Id=1; Name="Apple"; Amount=12 }  |] }


type DB = 
    static member Customers:List<Customer> = [ John; Ann; ]
    static member Commodities = [ Apple; Banana; Shit; ]
    static member Orders:List<Order> = [ Order1; ]        
