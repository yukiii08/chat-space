json.array! @users do |user|
  json.id user.id
  json.name user.name
  json.email  user.email
  json.encrypted_password user.encrypted_password
  json.created_at user.created_at.strftime("%Y/%m/%d %H:%M")
end