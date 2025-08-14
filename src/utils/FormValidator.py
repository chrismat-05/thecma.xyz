import re

def validate_email(email: str) -> bool:
    pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"
    return re.match(pattern, email) is not None

def validate_message(message: str, min_length: int = 10) -> bool:
    return len(message.strip()) >= min_length

def validate_form(data: dict) -> dict:
    errors = {}

    if not data.get('name'):
        errors['name'] = "Name is required."

    if not validate_email(data.get('email', '')):
        errors['email'] = "Invalid email format."

    if not validate_message(data.get('message', '')):
        errors['message'] = "Message is too short."

    return errors

# Example test
if __name__ == "__main__":
    sample = {
        'name': 'Chris',
        'email': 'chris@example.com',
        'message': 'Hey there!'
    }
    print(validate_form(sample))
