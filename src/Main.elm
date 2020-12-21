module Main exposing (main)

import Browser
import Browser.Navigation exposing (Key, load, pushUrl)
import Element exposing (..)
import Html exposing (Html)
import Url exposing (Url)



-- MAIN


main : Program Int Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        }



-- MODEL


type alias Model =
    { currentTime : Int }


init : val -> Url -> Key -> ( Model, Cmd Msg )
init val url key =
    ( { currentTime = 12345 }
    , Cmd.none
    )



-- UPDATE


type Msg
    = NoOp
    | LinkClicked Browser.UrlRequest
    | UrlChanged Url


update : Msg -> Model -> ( Model, Cmd Msg )
update _ model =
    ( model, Cmd.none )



-- VIEW


view : Model -> Browser.Document Msg
view model =
    { title = "Weihnachten 2020"
    , body = [ layout [] (text "hi") ]
    }



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none
