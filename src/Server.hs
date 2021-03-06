{-# LANGUAGE DeriveGeneric #-}

module Server ( app ) where

import qualified Control.Monad                  as ControlMonad
import qualified Data.Aeson                     as Aeson
import qualified Data.ByteString.Char8          as Char8
import qualified Data.ByteString.Lazy           as LazyByteString
import qualified Data.Text                      as Text
import qualified Data.Text.Lazy                 as LazyText
import qualified GHC.Generics                   as Generics
import qualified Network.HTTP.Types             as HTTPTypes
import qualified Network.Wai                    as Wai
import qualified Network.Wai.Handler.WebSockets as WaiWebSockets
import qualified Network.WebSockets.Connection  as Connection
import qualified Network.WebSockets             as WebSockets
import qualified Web.Scotty                     as Scotty

data Interview = Interview {
  name :: String
, date :: String
, email :: String
, phoneNumber :: String
} deriving (Generics.Generic, Show) 

instance Aeson.FromJSON Interview

app :: IO Wai.Application
app = do
  httpApp' <- httpApp 
  return $ WaiWebSockets.websocketsOr Connection.defaultConnectionOptions wsApp httpApp'

httpApp :: IO Wai.Application 
httpApp = Scotty.scottyApp $ do
  Scotty.post (Scotty.capture "/api/interview") scheduleInterview 
  Scotty.get (Scotty.capture "/static/:file") $ do
    file' <- Scotty.param (LazyText.pack "file")
    Scotty.file ("./static/" ++ file')

scheduleInterview :: Scotty.ActionM ()
scheduleInterview = do
  interviewData <- (Scotty.jsonData :: Scotty.ActionM Interview)
  Scotty.liftAndCatchIO (print (show interviewData))
  -- TODO write interview to database
  Scotty.text (LazyText.pack "interview scheduled")

wsApp :: WebSockets.ServerApp
wsApp pending_conn = do
  conn <- WebSockets.acceptRequest pending_conn
  print "Websocket connection"
  ControlMonad.forever $ do
    d <- (WebSockets.receiveData conn :: IO Text.Text)
    print (show d)
    WebSockets.sendTextData conn (Text.pack "Hello, client!")
