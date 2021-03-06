const TOKEN_TYPES = {
    EMAIL_VERIFICATION: 'email-verification'
};

const USER_TYPES = {
    CUSTOMER: 1,
    COUNCIL_MEMBER: 2,
    ADMIN: 3,
    ORGANIZATION_MEMBER: 4,
};

const RECYCLED_ITEM_STATUS = {
    PENDING_PICKUP: 'pending_pickup',
    PICKED_UP: 'picked_up',
    RECYCLED: 'recycled',
    MOVED_TO_STORE: 'moved_to_store',
    DESTROYED: 'destroyed',
};

const LOCATION_STATUS = {
    ACTIVE: 'active',
    SUSPENDED: 'suspended'
};

const ORDER_STATUS = {
    PENDING: 'pending',
    DELIVERED: 'delivered'
};

const ITEM_STATUS = {
    AVAILABLE: 'available',
    SOLD_OUT: 'sold_out',
};

const ALLOCATION_STATUS = {
    PENDING: 'pending',
    COMPLETED: 'completed',
};

const INVOICE_STATUS = {
    UNPAID: 'unpaid',
    PAID: 'paid'
};

const PICKUP_LIST_ITEM_STATUS = {
    ALLOCATED: 'allocated',
    UNALLOCATED: 'unallocated',
    COMPLETED: 'completed'
};


module.exports = {
    TOKEN_TYPES,
    USER_TYPES,
    RECYCLED_ITEM_STATUS,
    LOCATION_STATUS,
    ORDER_STATUS,
    ITEM_STATUS,
    ALLOCATION_STATUS,
    INVOICE_STATUS,
    PICKUP_LIST_ITEM_STATUS
}