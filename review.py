from faker import Faker
import random
import json
from datetime import datetime

faker = Faker()

data = []

for _ in range(200):
    review = {
        "rating": random.randint(1, 5),
        "description": faker.text(),
        "guestId": random.randint(1, 29),
        "hotelId": random.randint(1, 29),
        "createdAt": faker.date_time_this_year(before_now=True, after_now=False, tzinfo=None).strftime('%Y-%m-%d %H:%M:%S'),
        "updatedAt": faker.date_time_this_year(before_now=True, after_now=False, tzinfo=None).strftime('%Y-%m-%d %H:%M:%S')
    }
    data.append(review)

# Lưu dữ liệu vào file JSON
with open('reviews.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Dữ liệu đánh giá đã được lưu vào file reviews.json.")
