import json
import random

def generate_seed_data(room_count, min_services_per_room, max_services_per_room, service_ids):
    seed_data = []

    for room_id in range(1, room_count + 1):
        num_services = random.randint(min_services_per_room, max_services_per_room)
        unique_services = random.sample(service_ids, num_services)

        for service_id in unique_services:
            seed_data.append({
                "roomId": room_id,
                "serviceId": service_id,
                "createdAt": "2024-04-01 04:26:18",
                "updatedAt": "2024-04-01 04:26:18"
                
            })

    return seed_data

# Thiết lập các thông số
room_count = 56
min_services_per_room = 2
max_services_per_room = 3
service_ids = list(range(18, 24))  # danh sách các serviceId từ 18 đến 23

# Tạo dữ liệu seed
seed_data = generate_seed_data(room_count, min_services_per_room, max_services_per_room, service_ids)

# Ghi dữ liệu seed ra file JSON
output_file = "seed_data.json"
with open(output_file, "w") as f:
    json.dump(seed_data, f, indent=2)

print(f"Seed data generated and saved to '{output_file}' successfully.")
