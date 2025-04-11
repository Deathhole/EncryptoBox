def convert_private_key_for_env(private_key_path):
    with open(private_key_path, "r") as file:
        raw_key = file.read()

    escaped_key = raw_key.replace("\n", "\\n")
    print(f'FIREBASE_PRIVATE_KEY="{escaped_key}"')

# 🔧 Replace with your real key path if different
convert_private_key_for_env("serviceAccountKey.json")
