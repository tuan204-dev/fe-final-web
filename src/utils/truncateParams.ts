export const truncateParams = (params: Record<string, string | null | undefined | unknown> = {}) => {
    // Loại bỏ các giá trị null hoặc rỗng
    const cleanedParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value != null && value !== '')
    );

    // Chuyển đổi tất cả các giá trị trong cleanedParams thành kiểu chuỗi
    const stringParams = Object.entries(cleanedParams).reduce<Record<string, string>>(
        (acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
        },
        {}
    );

    const _searchParams = new URLSearchParams(stringParams).toString();
    const _params = _searchParams ? `?${_searchParams}` : '';

    return _params;
};