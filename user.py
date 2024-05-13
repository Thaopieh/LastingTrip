from faker import Faker
import random
import json

faker = Faker()

data = []

for _ in range(30):
    user = {
        "name": faker.name(),
        "email": faker.email(),
        "password": faker.password(),
        "numberPhone": faker.phone_number(),
        "birthDate": faker.date_of_birth(minimum_age=18, maximum_age=90).strftime('%Y-%m-%d'),
        "gender": random.choice([True, False]),
        "type": "owner",
                  "createdAt": "2024-04-01 04:26:18",
          "updatedAt": "2024-04-01 04:26:18"
    }
    data.append(user)

# Lưu dữ liệu vào file JSON
with open('data.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Dữ liệu đã được lưu vào file data.json.")
