import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";
import { Permission, Role } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // Create a new post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.error("Appwrite Service :: createPost ::", error);
      throw error;
    }
  }

  // Update an existing post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.error("Appwrite Service :: updatePost ::", error);
      throw error;
    }
  }

  // Delete a post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error("Appwrite Service :: deletePost ::", error);
      return false;
    }
  }

  // Get a single post
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error("Appwrite Service :: getPost ::", error);
      return null;
    }
  }

  // Get list of posts (default: only active posts)
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Appwrite Service :: getPosts ::", error);
      return null;
    }
  }

  // Upload a file to Appwrite Storage
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Appwrite Service :: uploadFile ::", error);
      return null;
    }
  }

  // Delete a file from storage
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Appwrite Service :: deleteFile ::", error);
      return false;
    }
  }

  // Get preview URL of a file (e.g. image)

  getFileView(fileId) {
    try {
      return this.bucket.getFileView(conf.appwriteBucketId, fileId).toString();
    } catch (error) {
      console.error("Appwrite Service :: getFileView ::", error); 
      return "";
    }
  }
}

const service = new Service();
export default service;
