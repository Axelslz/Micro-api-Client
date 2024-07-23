class Review {
    constructor({ id, userId, content, createdAt }) {
        this.id = id;
        this.userId = userId;
        this.content = content;
        this.createdAt = createdAt;
    }
}

module.exports = Review;
