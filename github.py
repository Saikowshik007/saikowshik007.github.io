import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration
open_source = {
    "github_converted_token": "your token",
    "github_user_name": "Saikowshik007"
}

# GraphQL Queries
query_pr = {
    "query": f"""
    query {{
        user(login: "{open_source['github_user_name']}") {{
            pullRequests(last: 100, orderBy: {{field: CREATED_AT, direction: DESC}}) {{
                totalCount
                nodes {{
                    id
                    title
                    url
                    state
                    mergedBy {{
                        avatarUrl
                        url
                        login
                    }}
                    createdAt
                    number
                    changedFiles
                    additions
                    deletions
                    baseRepository {{
                        name
                        url
                        owner {{
                            avatarUrl
                            login
                            url
                        }}
                    }}
                }}
            }}
        }}
    }}
    """
}

query_issue = {
    "query": f"""
    query {{
        user(login: "{open_source['github_user_name']}") {{
            issues(last: 100, orderBy: {{field: CREATED_AT, direction: DESC}}) {{
                totalCount
                nodes {{
                    id
                    closed
                    title
                    createdAt
                    url
                    number
                    assignees(first: 100) {{
                        nodes {{
                            avatarUrl
                            name
                            url
                        }}
                    }}
                    repository {{
                        name
                        url
                        owner {{
                            login
                            avatarUrl
                            url
                        }}
                    }}
                }}
            }}
        }}
    }}
    """
}

query_org = {
    "query": f"""
    query {{
        user(login: "{open_source['github_user_name']}") {{
            repositoriesContributedTo(last: 100) {{
                totalCount
                nodes {{
                    owner {{
                        login
                        avatarUrl
                        __typename
                    }}
                }}
            }}
        }}
    }}
    """
}

query_pinned_projects = {
    "query": f"""
    query {{
        user(login: "{open_source['github_user_name']}") {{
            pinnedItems(first: 6, types: REPOSITORY) {{
                totalCount
                nodes {{
                    ... on Repository {{
                        id
                        name
                        createdAt
                        url
                        description
                        isFork
                        languages(first: 10) {{
                            nodes {{
                                name
                            }}
                        }}
                    }}
                }}
            }}
        }}
    }}
    """
}

# API Configuration
base_url = "https://api.github.com/graphql"
headers = {
    "Content-Type": "application/json",
    "Authorization": f"bearer {open_source['github_converted_token']}"
}

# Language icons mapping
languages_icons = {
    "Python": "logos-python",
    "Jupyter Notebook": "logos-jupyter",
    "HTML": "logos-html-5",
    "CSS": "logos-css-3",
    "JavaScript": "logos-javascript",
    "C#": "logos-c-sharp",
    "Java": "logos-java",
    "Shell": "simple-icons:shell",
    "Ruby": "logos:ruby",
    "PHP": "logos-php",
    "Dockerfile": "simple-icons:docker",
    "Rust": "logos-rust",
}

def create_directories():
    """Create necessary directories if they don't exist"""
    os.makedirs("./src/shared/opensource", exist_ok=True)

def fetch_pull_requests():
    """Fetch and process pull requests data"""
    try:
        response = requests.post(base_url, headers=headers, json=query_pr)
        response.raise_for_status()

        data = response.json()
        cropped = {"data": []}
        cropped["data"] = data["data"]["user"]["pullRequests"]["nodes"]

        # Count states
        open_count = 0
        closed_count = 0
        merged_count = 0

        for pr in cropped["data"]:
            if pr["state"] == "OPEN":
                open_count += 1
            elif pr["state"] == "MERGED":
                merged_count += 1
            else:
                closed_count += 1

        cropped["open"] = open_count
        cropped["closed"] = closed_count
        cropped["merged"] = merged_count
        cropped["totalCount"] = len(cropped["data"])

        print("Fetching the Pull Request Data.\n")

        with open("./src/shared/opensource/pull_requests.json", "w") as f:
            json.dump(cropped, f, indent=2)

    except Exception as e:
        print(f"Error fetching pull requests: {e}")

def fetch_issues():
    """Fetch and process issues data"""
    try:
        response = requests.post(base_url, headers=headers, json=query_issue)
        response.raise_for_status()

        data = response.json()
        cropped = {"data": []}
        cropped["data"] = data["data"]["user"]["issues"]["nodes"]

        # Count open/closed
        open_count = 0
        closed_count = 0

        for issue in cropped["data"]:
            if not issue["closed"]:
                open_count += 1
            else:
                closed_count += 1

        cropped["open"] = open_count
        cropped["closed"] = closed_count
        cropped["totalCount"] = len(cropped["data"])

        print("Fetching the Issues Data.\n")

        with open("./src/shared/opensource/issues.json", "w") as f:
            json.dump(cropped, f, indent=2)

    except Exception as e:
        print(f"Error fetching issues: {e}")

def fetch_organizations():
    """Fetch and process organizations data"""
    try:
        response = requests.post(base_url, headers=headers, json=query_org)
        response.raise_for_status()

        data = response.json()
        orgs = data["data"]["user"]["repositoriesContributedTo"]["nodes"]
        new_orgs = {"data": []}

        for repo in orgs:
            obj = repo["owner"]
            if obj["__typename"] == "Organization":
                # Check for duplicates
                if obj not in new_orgs["data"]:
                    new_orgs["data"].append(obj)

        print("Fetching the Contributed Organization Data.\n")

        with open("./src/shared/opensource/organizations.json", "w") as f:
            json.dump(new_orgs, f, indent=2)

    except Exception as e:
        print(f"Error fetching organizations: {e}")

def fetch_pinned_projects():
    """Fetch and process pinned projects data"""
    try:
        response = requests.post(base_url, headers=headers, json=query_pinned_projects)
        response.raise_for_status()

        data = response.json()
        projects = data["data"]["user"]["pinnedItems"]["nodes"]
        new_projects = {"data": []}

        for project in projects:
            obj = project.copy()
            lang_objs = obj["languages"]["nodes"]
            new_lang_objs = []

            for lang in lang_objs:
                if lang["name"] in languages_icons:
                    new_lang_objs.append({
                        "name": lang["name"],
                        "iconifyClass": languages_icons[lang["name"]]
                    })

            obj["languages"] = new_lang_objs
            new_projects["data"].append(obj)

        print("Fetching the Pinned Projects Data.\n")

        with open("./src/shared/opensource/projects.json", "w") as f:
            json.dump(new_projects, f, indent=2)

    except Exception as e:
        print(f"Error fetching pinned projects: {e}")

def main():
    """Main function to run all data fetching operations"""
    print("Starting GitHub data fetch...\n")

    # Create necessary directories
    create_directories()

    # Fetch all data
    fetch_pull_requests()
    fetch_issues()
    fetch_organizations()
    fetch_pinned_projects()

    print("All data fetched successfully!")

if __name__ == "__main__":
    main()