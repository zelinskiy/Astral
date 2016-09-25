open Suave
open Suave.Filters
open Suave.Operators
open Suave.Successful
open Suave.Json
open Suave.Writers

open System.Text
open System.Runtime.Serialization
open System.Collections.Generic
open System

open Models


let toJsonWebPart o = 
    (toJson >> ok) o 
    >=> setMimeType "application/json; charset=utf-8" 

let app =
    choose
        [ GET >=> choose
        [ 

        path "/" >=> Files.file "./client/index.html"
        path "/editor" >=> Files.file "./client/editor.html"
        pathScan "/system/%d" (fun(id) ->  Files.file "./client/object.html")
        pathScan "/search/%s" (fun(id) ->  Files.file "./client/search.html")

        pathScan "/find/%s" (System.Web.HttpUtility.UrlDecode
            >> DB.findObjectsByName
            >> Seq.toArray
            >> toJsonWebPart)

        pathScan "/systemsWithObject/%d" (DB.findSystemsContainingObject 
            >> Seq.toArray 
            >> toJsonWebPart)

        path "/objects" >=> toJsonWebPart DB.AstralObjects
        path "/systems" >=> toJsonWebPart DB.AstralSystems

        pathScan "/loadobject/%d" (fun(id) -> match (DB.findObject id) with
            | Some(o) -> toJsonWebPart o
            | None -> RequestErrors.NOT_FOUND "Object not found.")

        pathScan "/loadsystem/%d" (fun(id) -> match (DB.findSystem id) with
            | Some(o) -> toJsonWebPart o
            | None -> RequestErrors.NOT_FOUND "System not found.")

        path "/hello" >=> OK "Hello!"

        Files.browseHome

        RequestErrors.NOT_FOUND "Page not found." 
        ]
        ]

[<EntryPoint>]
let main argv = 
    startWebServer defaultConfig app
    0




