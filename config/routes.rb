Rails.application.routes.draw do
  root 'main#home'

  post '/move', to: 'main#move'
  post '/new', to: 'main#new'
  post '/next_turn', to: 'main#next_turn'
  post '/reinforcement', to: 'main#reinforcement'
  post '/build', to: 'main#build'
end
