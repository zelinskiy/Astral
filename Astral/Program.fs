open Suave
open Suave.Filters
open Suave.Operators
open Suave.Successful
open Suave.Json
open Suave.Writers

open System.Text
open System.Runtime.Serialization
open System.Collections.Generic

open Models

let toJsonWebPart o = 
    (toJson >> ok) o 
    >=> setMimeType "application/json; charset=utf-8" 

let app =
    choose
        [ GET >=> choose
            [ 
                path "/objects" >=> toJsonWebPart DB.AllObjects
                path "/superobjects" >=> toJsonWebPart DB.SuperObjects 
                pathScan "/object/%d" (fun(id) -> match (DB.findObject id) with
                    | Some(o) -> toJsonWebPart o
                    | None -> RequestErrors.NOT_FOUND "Object not found.")

                path "/hello" >=> OK "Hello!"

                path "/solar" >=> Files.file "./client/solar.html"
                path "/three" >=> Files.file "./client/three.html"
                Files.browseHome

                RequestErrors.NOT_FOUND "Page not found." 
            ]
        ]

[<EntryPoint>]
let main argv = 
    printfn "Starting server at 8083..."
    startWebServer defaultConfig app
    0




