module Main where

import qualified Network.Wai.Handler.Warp as Warp

import qualified Server                   as Server

main :: IO ()
main = do
  port <- return 8080
  print ("app running on " ++ (show port))
  app' <- Server.app
  Warp.run port app'
