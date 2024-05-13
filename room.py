import json
import random
from faker import Faker

fake = Faker()

def generate_random_room_data(hotel_id):
    room_name = random.choice(["Standard Room", "Grand Suite", "Deluxe Room", "Executive Suite", "Family Room", "Triple Room", "Twin Room", "Superior Room", "Suite", "Junior Suite", "Penthouse"])
    room_data = {
        "name": room_name,
        "status": random.randint(0, 1),
        "price": 0,
        "quantity": random.randint(1, 8),
        "quantity_people": random.randint(1, 6),
        "type_bed": random.choice(["King", "Queen", "Double", "Single", "Three Single"]),
        "hotelId": hotel_id,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
    }

    if room_name == "Twin Room":
        room_data["type_bed"] = "Double"
    elif room_name == "Triple Room":
        room_data["type_bed"] = "Three Single"

    if room_name == "Standard Room":
        room_data["price"] = random.randint(100000, 200000)
    elif room_name == "Grand Suite":
        room_data["price"] = random.randint(5000000, 10000000)
    elif room_name == "Deluxe Room":
        room_data["price"] = random.randint(3000000, 6000000)
    elif room_name == "Executive Suite":
        room_data["price"] = random.randint(8000000, 15000000)
    elif room_name == "Family Room":
        room_data["price"] = random.randint(4000000, 8000000)
    elif room_name == "Triple Room":
        room_data["price"] = random.randint(3000000, 6000000)
    elif room_name == "Twin Room":
        room_data["price"] = random.randint(2000000, 4000000)
    elif room_name == "Superior Room":
        room_data["price"] = random.randint(1500000, 3000000)
    elif room_name == "Suite":
        room_data["price"] = random.randint(6000000, 12000000)
    elif room_name == "Junior Suite":
        room_data["price"] = random.randint(5000000, 10000000)
    elif room_name == "Penthouse":
        room_data["price"] = random.randint(10000000, 20000000)

    return room_data

# Tạo dữ liệu ngẫu nhiên cho nhiều phòng và hotel
num_hotels = 20  # Số lượng hotel
rooms_per_hotel = 6  # Số lượng phòng cho mỗi hotel
all_room_data = []

for hotel_id in range(1, num_hotels + 1):
    for _ in range(rooms_per_hotel):
        room_data = generate_random_room_data(hotel_id)
        all_room_data.append(room_data)

# Sắp xếp các thuộc tính theo thứ tự yêu cầu
sorted_room_data = []
for room_data in all_room_data:
    sorted_room_data.append({
        "name": room_data["name"],
        "status": room_data["status"],
        "price": room_data["price"],
        "quantity": room_data["quantity"],
        "quantity_people": room_data["quantity_people"],
        "type_bed": room_data["type_bed"],
        "hotelId": room_data["hotelId"],
        "createdAt": room_data["createdAt"],
        "updatedAt": room_data["updatedAt"]
    })

# Xuất dữ liệu vào tệp tin JSON
filename = "room_data.json"
with open(filename, "w") as file:
    json.dump(sorted_room_data, file, indent=4)

print("Dữ liệu đã được xuất ra tệp tin", filename)