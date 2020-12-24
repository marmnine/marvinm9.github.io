module Main exposing (main)

import Browser exposing (..)
import Browser.Navigation exposing (Key, load, pushUrl)
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events as Events
import Element.Font exposing (..)
import Element.Input as Input
import FeatherIcons as FeatherIcons
import File.Download as FileDownload
import Html exposing (Html, iframe)
import Html.Attributes exposing (sandbox, srcdoc, style)
import Url exposing (Protocol(..), Url, fromString)



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
    {}


init : Int -> Url -> Key -> ( Model, Cmd Msg )
init _ url key =
    ( {}
    , Cmd.none
    )



-- UPDATE


type Msg
    = StartDownload
    | LinkClicked Browser.UrlRequest
    | UrlChanged Url


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        StartDownload ->
            ( model, FileDownload.url "https://marvinm9.github.io/audio.mp3" )

        _ ->
            ( model, Cmd.none )



-- VIEW


view : Model -> Browser.Document Msg
view model =
    { title = "Weihnachten 2020"
    , body =
        [ layout
            [ width fill
            , height fill
            , Background.gradient
                { angle = -1.1
                , steps = [ rgb255 0 34 27, rgb255 1 20 22 ]
                }
            ]
            pageContent
        ]
    }


pageContent : Element Msg
pageContent =
    let
        eve =
            400
    in
    column
        [ centerX, centerY ]
        [ el [ centerX, color <| rgb255 234 175 65, size eve, onRight <| el [ color <| rgb255 234 175 65, size eve ] (text ".") ] <| text "24"
        , el [ centerX, color <| rgb255 234 175 65, size 45, moveUp 30, moveRight 200 ] <| text "Türchen"
        , el [ centerX, width <| px 530, height <| px 895, paddingEach { top = 70, bottom = 105, left = 0, right = 0 } ] myIframe
        , el [ centerX ] myButton
        , el [ centerX, height <| px eve ] none
        ]


myIframe : Element msg
myIframe =
    html <|
        iframe
            [ style "width" "fill"
            , style "border-style" "solid"
            , style "height" "530"
            , style "width" "895"
            , style "patting" "0"
            , style "margin" "0"
            , style "border" "0"
            , style "content" "0"
            , srcdoc "<iframe width='available' height='available' src='https://www.youtube.com/embed/RxjLwsbTzMc' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
            ]
            []


myButton : Element Msg
myButton =
    Input.button
        [ paddingXY 35 5
        , Border.rounded 19
        , Background.color <| rgb255 234 175 65
        , color <| rgb255 0 29 25
        , focused
            []
        , mouseDown [ Background.color <| rgb255 200 140 17, color <| rgb255 0 44 50 ]
        ]
        { onPress = Just StartDownload
        , label = row [] [ html (FeatherIcons.toHtml [ style "padding-right" "30px" ] (FeatherIcons.withSize 90 FeatherIcons.download)), el [ size 100 ] <| text "Download" ]
        }



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none



{-
   myButton : Element Msg
   myButton =
       let
           maybeURL =
               { protocol = Https
               , host = "example.com"
               , port_ = Just 443
               , path = "/"
               , query = Nothing
               , fragment = Nothing
               }
       in
       Input.button
           [ Background.color <| rgb255 234 175 65
           , focused
               []
           , mouseDown [ Background.color <| rgb255 1 1 1 ]
           ]
           { onPress = Just <| LinkClicked <| Internal <| Maybe.withDefault maybeURL <| fromString "/download"
           , label = row [] [ html (FeatherIcons.toHtml [] FeatherIcons.download), el [] <| text "Download" ]
           }

-}
