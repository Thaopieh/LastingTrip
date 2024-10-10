
exports.checkAccess = (resourceId, user, action) => {
    // Giả định rằng các tài nguyên có thuộc tính department
    const resources = [
        { id: 1, department: 'admin', sensitivity: 'high' },
        { id: 2, department: 'owner', sensitivity: 'medium' },
        { id: 3, department: 'client', sensitivity: 'low' }
    ];

    const resource = resources.find(r => r.id === resourceId);

    if (!resource) {
        return false;  // Tài nguyên không tồn tại
    }

    // Chính sách ABAC dựa trên vai trò, department, và độ nhạy cảm
    if (user.role === 'admin') {
        return true; // Admin có quyền truy cập tất cả
    }

    // Người dùng cùng phòng ban với tài nguyên và quyền truy cập không vượt quá mức độ nhạy cảm
    if (user.department === resource.department) {
        if (action === 'read' && resource.sensitivity === 'low') {
            return true;
        } else if (action === 'edit' && resource.sensitivity === 'medium') {
            return true;
        }
    }

    return false; // Không có quyền truy cập
};
