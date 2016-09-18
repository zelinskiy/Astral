open Suave
open Suave.Filters
open Suave.Operators
open Suave.Successful
open Suave.Json

open System.Text
open System.Runtime.Serialization
open System.Collections.Generic

open Models

let app3 =
    choose
        [ GET >=> choose
            [ 
                path "/customers" >=> mapJson (fun () -> List.toArray DB.Customers)
                path "/commodities" >=> mapJson (fun () -> List.toArray DB.Commodities)
                path "/orders" >=> mapJson (fun () -> List.toArray DB.Orders)
                path "/hello" >=> OK "Hello!"

                path "/" >=> OK "Main page"
                path "/three" >=> Files.file "./client/three.html"
                Files.browseHome

                RequestErrors.NOT_FOUND "Page not found." 
            ]
        ]


let app1 =
    choose
        [ GET >=> choose
            [ 
                path "/customers" >=> mapJson (fun () -> List.toArray DB.Customers)
                path "/commodities" >=> mapJson (fun () -> List.toArray DB.Commodities)
                path "/orders" >=> mapJson (fun () -> List.toArray DB.Orders)
                path "/hello" >=> OK "Hello!"

                path "/three" >=> OK "Lol" //Files.file "..\\..\\..\\client\\three.js"

                RequestErrors.NOT_FOUND "Page not found." 
            ]
        ]


let app2 = mapJson (fun a -> DB.Customers.Head)

[<EntryPoint>]
let main argv = 
    printfn "Starting server at 8083..."
    startWebServer defaultConfig app3
    0




