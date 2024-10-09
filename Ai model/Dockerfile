# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /"Ai model"/deforestation_percenatge_image_api

# Copy the requirements.txt into the container
COPY requirements.txt /"Ai model"/deforestation_percenatge_image_api/requirements.txt

# Install any dependencies
RUN pip install --no-cache-dir -r /"Ai model"/deforestation_percenatge_image_api/requirements.txt

# Copy the current directory contents into the container at /app
COPY . /"Ai model"/deforestation_percenatge_image_api

# Expose the port FastAPI runs on
EXPOSE 8000

# Command to run the FastAPI app using Uvicorn
CMD ["uvicorn", "deforestation_percenatge_image_api:app", "--host", "0.0.0.0", "--port", "8000"]
